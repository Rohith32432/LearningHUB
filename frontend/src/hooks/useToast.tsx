import toast from "react-hot-toast";
import { data } from "react-router-dom";

function useToast() {
  
    function promisetoast(promise: Promise<any>,msg?:string) {
       let message;
       message = promise.then(res => {    
        // console.log(res.json());
            
         return res?.message
       });
       
       
       return toast.promise(promise, {
            loading: 'loading....',
            success: <b>{ msg!='' ?  msg||message :'Done!'}</b>,
            error: <b>Error.</b>,
        },{
            style:{
                backgroundColor:'black',
                color:'white'
            }
        })
    }
    function normaltost(msg:String,type='success'){
        return type=='sucess'? toast.success(`${msg}`):toast.error(`${msg}`)
    }

    return {promisetoast,normaltost}
   
}

export default useToast