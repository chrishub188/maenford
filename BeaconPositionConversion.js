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

    //Set the long and lat position of the beacon
    set setPosition(long, lat){
        this.long = long;
        this.lat = lat;
    }

    //Update the container associated with the beacon
    set setContainer(container){
        this.container = container
    }

    //Returns the current container associated with this beacon
    get getContainer(){
        return this.container;
    }

    //Returns the current beacon ID
    get getID(){
        return this.ID;
    }

    //Get X and Y position relative to the anchor beacon
    get positionX(){
        //Update the x position
        this.x = 2*R*Math.cos((this.lat + AnchorLat)/2)*Math.sin((this.long - AnchorLong)/2);

        //return the x position
        return this.x
    }
    get positionY(){
        //Update the y position
        this.y = 2*R*Math.sin((this.lat-AnchorLat)/2)

        //return the y position
        return this.y;
    }
}


//Call whenever new beacon data is received in MQTT
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
        AnchorLat = AnchorLat;
    }
    //Otherwise, what was detected must have been a beacon
    else{
        //Check if it matches any ID currently stored
        var contains = false;
        for(i=0; i<BeaconList.length; ++i){
            //Check if the beacon ID matches
            if(BeaconList[i].getID == BeaconID){
                //If it matches, update the long and lat
                BeaconList[i].setPosition(BeaconLong, BeaconLat);
                contains = true;
            }
        } 
        //If no beacon matches, add it to the list
        if(contains == false){
            newBeacon = new Beacon(BeaconID, BeaconLong, BeaconLat);
            BeaconList.push(newBeacon);

            //Issue a data received MQTT to the beacon
            var ReturnMQTT = 'ID';
            ReturnMQTT = ReturnMQTT.concat(',', BeaconID, 'BeaconAdded');
        }
    }
}

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
        }
    }
}

//Returns the X and Y position of a container and angle orientation
//Takes the container ID as input
function ContainerPosition(ContainerID){
    var x1, x2, y1, y2, num, angle = 0;
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
        angle * Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
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