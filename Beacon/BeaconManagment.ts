
//Anchor variab;es
var AnchorLong:number = 0;
var AnchorLat:number = 0;

//Radius of the earth
const R:number = 6.371 * 10^6;

//Class that stores data on each of the beacons
class Beacon{
    id:string;          //Beacon ID
    container:string;   //Container ID
    long:number;        //Beacon longitudinal position
    lat:number;         //Beacon latidudinal position
    x:number;           //Beacon X position
    y:number;           //Beacon Y position
    constructor(ID:string, LongPos:number, LatPos:number){
        this.id = ID;
        this.container = null;
        this.long = LongPos;
        this.lat = LatPos;
        this.x = 0;
        this.y = 0;
    }

    //Sets the beacon longitudinal position
    set setLong(LongNew:number){
        this.long = LongNew;
    }
    //Sets the beacon latidudinal position
    set setLat(LatNew:number){
        this.long = LatNew;
    }
    //Sets the container ID
    set setContainer(ContNew:string){
        this.container = ContNew;
    }

    //Returns the current container associated with this beacon
    get getContainer(){
        return this.container;
    }
    //Returns the current beacon ID
    get getID(){
        return this.id;
    }
    //Get the X and Y position relative to the anchor beacon
    get positionX(){
        //Update the x position
        this.x = 2*R*Math.cos((this.lat + AnchorLat)/2)*Math.sin(((this.long - AnchorLong))/2);
        //Return the x position
        return this.x
    }
    get positionY(){
        //Update the y position
        this.y = 2*R*Math.sin(((this.lat-AnchorLat))/2)

        //return the y position
        return this.y;
    }

}

//Array of beacons
var BeaconList = new Array();

//Array of currently being tracked container IDs
var ContainerList = new Array();

//Called by BeaconMQTTHandler
//Updates the beacon data in the list
function UpdateBeacon(MQTTINPUT:string){
    //Split input into sections basec on commas
    var MQTTData = MQTTINPUT.split(',');

    //Get ID from the input, ID is one index after ID
    var BeaconID = MQTTData[MQTTData.indexOf("ID")+1];
    var BeaconLong = parseFloat(MQTTData[MQTTData.indexOf("Long")+1]);
    var BeaconLat = parseFloat(MQTTData[MQTTData.indexOf("Lat")+1]);

    //If it is the anchor, update the anchor
    //The anchor will have an ID A0
    if(BeaconID == "A0"){
        AnchorLong = BeaconLong;
        AnchorLat = BeaconLat;
    }
    //Otherwise, what was detected must have been a beacon
    else{
        //Check if it matches any ID currently stored
        var contains:boolean = false;
        for(var i:number=0; i<BeaconList.length; ++i){
            //Check if the beacon ID matches
            if(BeaconList[i].getID == BeaconID){
                //If it matches, update the long and lat
                BeaconList[i].setLong(BeaconLong);
                BeaconList[i].setLat(BeaconLat);
                contains = true;
            }
        } 
        //If no beacon matches, add it to the list
        if(contains == false){
            let newBeacon = new Beacon(BeaconID, BeaconLong, BeaconLat);
            BeaconList.push(newBeacon);

            //Issue a list of all valid containers to the beacon
            var ReturnMQTT:string = 'ID';
            ReturnMQTT = ReturnMQTT.concat(',', BeaconID, 'ContainerList');
            for(var j:number=0; j<ContainerList.length; ++i){
                ReturnMQTT = ReturnMQTT.concat(',',ContainerList[j]);
            }
            BeaconSendMQTT(ReturnMQTT);
        }
    }
}

//Called by beacon MQTT handler
//Pairs a beacon with a container
function PairContainer(MQTTINPUT:string){
    //Split input into sections basec on commas
    var MQTTData = MQTTINPUT.split(',');

    //Get ID from the input, ID is one index after ID
    var BeaconID:string = MQTTData[MQTTData.indexOf("ID")+1];
    //Get container name from the input, located one index after Cont
    var ContainerID:string = MQTTData[MQTTData.indexOf("Cont")+1];

    //Locate the beacon ID in the list and add the container ID
    for(var i:number=0; i<BeaconList.length; ++i){
        //Check if the beacon ID matches
        if(BeaconList[i].getID == BeaconID){
            //Set the containerID
            BeaconList[i].setContainer(ContainerID);

            //Issue a list of containers for pairing to the beacon
            //TODO
            var ReturnMQTT:string = 'ID';
            ReturnMQTT = ReturnMQTT.concat(',', BeaconID, 'ContainerPaired');
            BeaconSendMQTT(ReturnMQTT);
        }
    }
}

//Returns the X and Y position of a container and angle orientation
//Takes the container ID as input
function ContainerPosition(ContainerID:string){
    var x1=0, x2=0, y1=0, y2=0, num=0, angle = 0;
    //If there are two, return the average xy and angle
    for(var i:number=0; i<BeaconList.length; ++i){
        if(BeaconList[i].container == ContainerID){
            //If this is the first beacon, move to 1
            if(num < 1){
                x1 = BeaconList[i].positionX;
                y1 = BeaconList[i].positionY;
                ++num;
            }
            //If this is the second beacon, add to 2
            else{
                x2 = BeaconList[i].positionX;
                y2 = BeaconList[i].positionY;
                ++num;
            }
        }
    }
    //If there is only one, return the xy and 0 angle
    if(num == 1){
        return [x1, y1, angle];
    }
    //Otherwise, calculate the average pos and angle of the container
    else{
        var xavg:number = (x1+x2)/2;
        var yavg:number = (y1+y2)/2;
        var angle:number = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
        return [xavg, yavg, angle];
    }
}

//Removes beacons associated with a container
function RemoveContainer(ContainerID:string){
    //Find all beacons associated with a container ID
    for(var i:number=0; i<BeaconList.length; ++i){
        //Check if the container ID matches
        if(BeaconList[i].container == ContainerID){
            BeaconList.splice(i,1);
            //Move the indexing back to ensure we don't skip one
            --i;
        }
    }
    //Remove the container from the list
    for(var i:number=0; i<ContainerList.length; ++i){
        if(ContainerList[i] == ContainerID){
            ContainerList.splice(i,1);
            --i;
        }
    }
}

//Adds a container to the list of being tracked
function AddContainer(ContainerID:string){
    var DoesNotContain:boolean = true;
    //Check if the list currently contains the container
    //Only add the container if it is not here
    for(var i:number=0; i<ContainerList.length; ++i){
        if(ContainerList[i] == ContainerID){
            DoesNotContain = false;
        }
    }
    if(DoesNotContain){
        ContainerList.push(ContainerID);
    }
}

//Takes an MQTT command and sends it to the appropriate section
//Does not send if the command does not match
function BeaconMQTTHandler(MQTTINPUT:string){
    //This code is initializing or sending new position data for a beacon
    if (MQTTINPUT.includes("ID") && MQTTINPUT.includes("Long") && MQTTINPUT.includes("Lat")){
        UpdateBeacon(MQTTINPUT);
    }
    else if(MQTTINPUT.includes("ID") && MQTTINPUT.includes("Cont")){
        PairContainer(MQTTINPUT)
    }
}

//Sends an MQTT command back to beacon
function BeaconSendMQTT(MQTTMessage:string){
    //TODO
}

//Test code

var MQTTAnchor:string = "ID,A0,Lat,37.427340,Long,-122.169748"
var MQTTString1:string = "ID,B1,Lat,37.427335,Long,-122.169848";
var MQTTString2:string = "ID,B1,Cont,MC-7410";
var MQTTString3:string = "ID,B2,Lat,37.427330,Long,-122.169842";
var MQTTString4:string = "ID,B2,Cont,MC-7410";

BeaconMQTTHandler(MQTTAnchor);
BeaconMQTTHandler(MQTTString1);
BeaconMQTTHandler(MQTTString2);
BeaconMQTTHandler(MQTTString3);
BeaconMQTTHandler(MQTTString4);


console.log(BeaconList[0]);
console.log(BeaconList[1]);
console.log(ContainerPosition("MC-7410"));
