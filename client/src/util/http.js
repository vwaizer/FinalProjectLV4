import  axios  from "axios";

class Http{
    constructor(){
        this.accessToken=localStorage.getItem("accessToken")
        console.log(this.accessToken);
        this.instance=axios.create({
            baseURL:"http://localhost:4000",
            timeout:10000,
            headers: {
                "Content-Type":"application/json"
            }

        })
        this.instance.interceptors.request.use(
            (config) => {
              // Làm gì đó trước khi request dược gửi đi
              if (this.accessToken) {
                config.headers.authorization = "Bearer "+this.accessToken
                console.log(config.headers.authorization);
                return config
              }
              return config
            },
            (error) => {
              return Promise.reject(error)
            }
          )
          // Add a response interceptor
          this.instance.interceptors.response.use(
            (response) => {
              const { url } = response.config
              console.log(url)
              if (url === "/login" || url === "/register") {
                console.log(url);
                const data = response.data 
                this.accessToken = data.data?.access_token
                localStorage.setItem("accessToken",this.accessToken)
                // response.config.headers.Authorization = "Bearer "+this.accessToken
                console.log(response.config.headers.authorization);
              } 
              return response
            },
            function (error) {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                return Promise.reject(error);
              })
          
    }
}
export const http=new Http().instance
