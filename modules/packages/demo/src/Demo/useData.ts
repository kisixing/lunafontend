
const datacache: Array<any> = [];
export default datacache
const defaultUrl = "ws://192.168.0.192:8084/websocket/?request=e2lkOjE7cmlkOjI2O3Rva2VuOiI0MzYwNjgxMWM3MzA1Y2NjNmFiYjJiZTExNjU3OWJmZCJ9"
export const useData = (setDevice:any,url = defaultUrl): Promise<Array<any>> => {
    // event.emit
    var socket: WebSocket;

    socket = new WebSocket(url);

    return new Promise((res) => {
        socket.onerror = () => {
            res(datacache)
        }
        socket.onopen = function (event) {
        };
        socket.onclose = function (event) {
            console.log("websocket 关闭了");
        };
        // 接收服务端数据时触发事件
        socket.onmessage = function (msg) {
            var received_msg = JSON.parse(msg.data);
            if (received_msg) {
                //showMessage(received_msg);
                if (received_msg.name == "push_devices") {
                    // console.log(received_msg.data);
                    var devlist = received_msg.data;
                    for (var i in devlist) {
                        var devdata = devlist[i];
                        if (!devdata)
                            continue;
                        if (!datacache[devdata['device_no']]) {
                            datacache[devdata['device_no']] = { 'fhr': [], 'toco': [], 'fm': [], 'curindex': 0, 'length': 0, 'last': 0 };
                            for (var fetal = 0; fetal < 3; fetal++) {
                                datacache[devdata['device_no']].fhr[fetal] = [];
                            }
                        }
                        setDevice(devlist)
                    }
                    res(datacache)

                } else if (received_msg.name == "push_data_ctg") {
                    //TODO 解析应用层数据包
                    var ctgdata = received_msg.data;
                    //console.log(ctgdata);
                    //console.log(ctgdata[0].fhr);
                    var id = received_msg.device_no;
                    if (datacache[received_msg.device_no]) {
                        for (var key in ctgdata) {
                            datacache[received_msg.device_no].fhr[0][ctgdata[key].index] = ctgdata[key].fhr;
                            datacache[received_msg.device_no].fhr[1][ctgdata[key].index] = ctgdata[key].fhr2;
                            datacache[received_msg.device_no].toco[ctgdata[key].index] = ctgdata[key].toco;
                            setcur(received_msg.device_no, ctgdata[key].index);
                            // 更新last index
                            if ((ctgdata[key].index - datacache[id].last) < 2) {
                                datacache[id].last = ctgdata[key].index;
                            }
                        }
                    }
                    //  console.log(datacache[received_msg.device_no].fhr[0]);
                } else if (received_msg.name == "get_data_ctg") {
                    //TODO 解析应用层数据包
                    var ctgdata = received_msg.data;
                    //console.log(ctgdata);
                    //  console.log(ctgdata[0].fhr);
                    var id = received_msg.device_no;
                    if (datacache[received_msg.device_no]) {
                        for (var key in ctgdata) {
                            datacache[received_msg.device_no].fhr[0][ctgdata[key].index] = ctgdata[key].fhr;
                            datacache[received_msg.device_no].fhr[1][ctgdata[key].index] = ctgdata[key].fhr2;
                            datacache[received_msg.device_no].toco[ctgdata[key].index] = ctgdata[key].toco;
                            setcur(received_msg.device_no, ctgdata[key].index);
                        }
                        //更新 last缺失
                        for (let i = datacache[id].last; i < datacache[id].fhr[0].length; i++) {
                            //TODO 优化：假设缺1~3点直接补
                            if (!datacache[id].fhr[0][i]) {
                                datacache[id].last = i - 1;
                                break;
                            } else {
                                datacache[id].last = i;
                            }
                        }
                    }
                }
                else if (received_msg.name == "get_devices") {
                    console.log(received_msg.data);
                    var devlist = received_msg.data;
                    for (var i in devlist) {
                        var devdata = devlist[i];
                        if (!devdata)
                            continue;

                    }
                }
            }
        };

        return [datacache]
    })

    function setcur(id: number, value: number) {
        if (value > 1) {
            for (var i = datacache[id].last; i < value; i++) {
                if (!datacache[id].fhr[0][i]) {
                    send('{"name":"get_data_ctg","data":{"start_index":' + i + ',"end_index":' + value + ',"device_no":' + id + ',"bed_no":1}}');
                    break;
                }
            }
        }
    }



    function send(message: string) {
        if (!window.WebSocket) {
            return;
        }
        if (socket.readyState == WebSocket.OPEN) {
            socket.send(message);
        } else {
            alert("The socket is not open.");
        }
    }
}


