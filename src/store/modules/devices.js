// const mqtt = require("mqtt");
const date = require('../../utils/date.js')
export default {
    state: {
        sensorData: [],
        controllerData: [],
        /**
        // 按钮的禁用
        connection_disabled: false,
        close_disabled: true,
        connection_loading: false,
        // 输入框禁用
        inputDisabled: false,
        connection_info: "未连接", // 连接情况
        client: null,
        sensorData: [],
        controllerData: [],
        path_info: {
            host: "www.itguye.top",
            port: "8083",
            path: "/mqtt",
        },
        options: {
            clientId: "mqttjs_12e2476c",
            userName: "admin",
            passWord: "public",
            keepalive: 60,
            connectTimeout: 4000,
        },
         */
        connection_info: "未连接", // 连接情况
    },
    mutations: {
        //用户点击连接
        /** 
        openConnection(state, arrays) {
            state.connection_loading = true
            if (state.connection_info === "未连接") {
                state.client = mqtt.connect(arrays[0], arrays[1]);
                if (state.client != null) {
                    // 是否连接成功
                    state.client.on("connect", (e) => {
                        console.log(e)
                        // Subscribe
                        state.client.subscribe("smartagriculture/data/#", {
                            qos: 0
                        });
                    });

                    // 连接成功
                    state.connection_info = "已连接"
                    state.connection_loading = false
                    state.connection_disabled = true
                    state.close_disabled = false
                    state.inputDisabled = true
                }

            } else {
                state.connection_info = "未连接"
                state.connection_loading = false
                state.close_disabled = true
                state.connection_disabled = false
                state.inputDisabled = false
            }

        }, // 用户点击关闭
        closeConnection(state) {
            state.connection_info = "未连接"
            state.connection_loading = false
            state.close_disabled = true
            state.connection_disabled = false
            state.inputDisabled = false


            // 是否连接成功
            if (state.client != null) {
                state.client.end(true, null, () => {
                    state.client = null
                })
            }

        }    ,
        */
        saveDataResult(state, dataResult) {

            // 从后端返回的数据
            if (dataResult.sensorData != null || dataResult.controllerData != null) {
                // 
                // 表名数据发生变化了
                state.sensorData = dataResult.sensorData
                state.controllerData = dataResult.controllerData
                // // 判断数据和上一个数据一致
                // if ((dataResult.sensorData.length > 0 || dataResult.controllerData.length > 0)) {
                //     if (state.sensorData[0].time === dataResult.sensorData[0].time) { // 数据没有发生变化
                //         state.connection_info = "不在线"
                //         return;
                //     }
                // }

                // 判断是否在线
                if (state.sensorData.length > 0 || state.controllerData.length > 0) {
                    // 时间为最近30秒钟的数据
                    if (state.controllerData.length > 0) {
                        if (date.dateLessThan30S(null, new Date(state.controllerData[0].time))) {
                            state.connection_info = "在线"
                        } else {
                            state.connection_info = "不在线"
                        }
                    } else if (state.sensorData.length > 0) {
                        if (date.dateLessThan10S(new Date(state.sensorData[0].time), null)) {
                            state.connection_info = "在线"
                        } else {
                            state.connection_info = "不在线"
                        }
                    }
                }

            } else {
                state.connection_info = "不在线"
            }

        }
        /** ,
        updatePathInfo(state, array) {
            if (array[0] === "host") {
                state.path_info.host = array[1]
            } else if (array[0] === "port") {
                state.path_info.port = array[1]
            } else if (array[0] === "path") {
                state.path_info.path = array[1]
            }
        },
        updateOptions(state, array) {
            if (array[0] === "clientId") {
                state.path_info.clientId = array[1]
            } else if (array[0] === "userName") {
                state.path_info.userName = array[1]
            } else if (array[0] === "passWord") {
                state.path_info.passWord = array[1]
            } else if (array[0] === "keepalive") {
                state.path_info.keepalive = array[1]
            }
        }
        */
    }
}