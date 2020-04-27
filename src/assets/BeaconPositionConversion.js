/* Davids very very bad code
I don't know how to make functions private so here's what you call

BeaconMQTTHandler(MQTT Message)
Send it beacon MQTT messages and it will add the beacon to the list or update things

ContainerPosition(ContainerID)
Returns the [Xposition, Yposition, Angle] of a container using the container ID
The X and Y position are in meters and the Angle is the angle in degrees to the x axis

RemoveContainer(ContainerID)
Removes a containerID from the list of containers to track

AddContainer(ContainerID)
Adds a containerID to a list of containers to track

*/

//Anchor variables
var AnchorLong, AnchorLat;
AnchorLong = 0;
AnchorLat = 0;

//Radius of the earth
var R = 6.371 * 10^6;

//Array of beacons
var BeaconList = new Array();

//Class that stores data on each on the beacons
class Beacon {
    constructor(ID, long, lat){
        this.id = ID;
        this.container = null;
        this.long = long;
        this.lat = lat;
        this.x = 0;
        this.y = 0;
    }

    //Set the longitudinal position of the beacon
    /**
     * @param {Number} long_new
     */
    setLong(long_new){
        this.long = long_new;
        
    }
    //Set the latitudinal position of the beacon
    /**
     * @param {Number} lat_new
     */
    setLat(lat_new){
        this.lat = lat_new;
    }

    /**
     * @param {String} container_new
     */
    setContainer(container_new){
        this.container = container_new
    }

    //Returns the current container associated with this beacon
    get getContainer(){
        return this.container;
    }

    //Returns the current beacon ID
    get getID(){
        return this.id;
    }

    //Get X and Y position relative to the anchor beacon
    get positionX(){
        //Update the x position
        this.x = 2*R*Math.cos((this.lat + AnchorLat)/2)*Math.sin(((this.long - AnchorLong))/2);

        //return the x position
        return this.x
    }
    get positionY(){
        //Update the y position
        this.y = 2*R*Math.sin(((this.lat-AnchorLat))/2)

        //return the y position
        return this.y;
    }
}


//Called by BeaconMQTTHandler
//Updates the beacon data in the list
function UpdateBeacon(MQTTINPUT){
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
        var contains = false;
        for(i=0; i<BeaconList.length; ++i){
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

            //Issue a data received MQTT to the beacon
            var ReturnMQTT = 'ID';
            ReturnMQTT = ReturnMQTT.concat(',', BeaconID, 'BeaconAdded');
        }
    }
}

//Called by beacon MQTT handler
//Pairs a beacon with a container
function PairContainer(MQTTINPUT){
    //Split input into sections basec on commas
    var MQTTData = MQTTINPUT.split(',');

    //Get ID from the input, ID is one index after ID
    var BeaconID = MQTTData[MQTTData.indexOf("ID")+1];
    //Get container name from the input, located one index after Cont
    var ContainerID = MQTTData[MQTTData.indexOf("Cont")+1];

    //Locate the beacon ID in the list and add the container ID
    for(i=0; i<BeaconList.length; ++i){
        //Check if the beacon ID matches
        if(BeaconList[i].getID == BeaconID){
            //Set the containerID
            BeaconList[i].setContainer(ContainerID);

            //Issue a data received MQTT to the beacon
            var ReturnMQTT = 'ID';
            ReturnMQTT = ReturnMQTT.concat(',', BeaconID, 'ContainerPaired');
            BeaconSendMQTT(ReturnMQTT);
        }
    }
}

//Returns the X and Y position of a container and angle orientation
//Takes the container ID as input
function ContainerPosition(ContainerID){
    var x1=0, x2=0, y1=0, y2=0, num=0, angle = 0;
    //If there are two, return the average xy and angle
    for(i=0; i<BeaconList.length; ++i){
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
        xavg = (x1+x2)/2;
        yavg = (y1+y2)/2;
        angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
        return [xavg, yavg, angle];
    }
}

//Removes beacons associated with a container
function RemoveContainer(ContainerID){
    //Find all beacons associated with a container ID
    for(i=0; i<BeaconList.length; ++i){
        //Check if the container ID matches
        if(BeaconList[i].container == ContainerID){
            BeaconList.splice(i,1);
            //Move the indexing back to ensure we don't skip one
            --i;
        }
    }
}

//Adds a container to the list of being tracked
//Sends an MQTT message with this ID to the beacons
function AddContainer(ContainerID){
    //TODO
}

//Takes an MQTT command and sends it to the appropriate section
//Does not send if the command does not match
function BeaconMQTTHandler(MQTTINPUT){
    //This code is initializing or sending new position data for a beacon
    if (MQTTINPUT.includes("ID") && MQTTINPUT.includes("Long") && MQTTINPUT.includes("Lat")){
        UpdateBeacon(MQTTINPUT);
    }
    else if(MQTTINPUT.includes("ID") && MQTTINPUT.includes("Cont")){
        PairContainer(MQTTINPUT)
    }
}

//Sends an MQTT command back to beacon
function BeaconSendMQTT(MQTTMessage){
    //TODO
}

//Test code
/*
MQTTAnchor = "ID,A0,Lat,37.427340,Long,-122.169748"
MQTTString1 = "ID,B1,Lat,37.427335,Long,-122.169848";
MQTTString2 = "ID,B1,Cont,MC-7410";
MQTTString3 = "ID,B2,Lat,37.427330,Long,-122.169842";
MQTTString4 = "ID,B2,Cont,MC-7410";

BeaconMQTTHandler(MQTTAnchor);
BeaconMQTTHandler(MQTTString1);
BeaconMQTTHandler(MQTTString2);
BeaconMQTTHandler(MQTTString3);
BeaconMQTTHandler(MQTTString4);


console.log(BeaconList[0]);
console.log(BeaconList[1]);
console.log(ContainerPosition("MC-7410"));
*/