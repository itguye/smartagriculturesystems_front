export default {
    state: {
           data:[],
           symbol:null
    },mutations:{
        getSensorData(state,arrays){
            if(arrays!=null && arrays.length >0){
                state.data = arrays
                state.symbol = arrays[0].symbol;
            }
          
        }
    }
}