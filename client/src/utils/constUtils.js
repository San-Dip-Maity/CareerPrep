// export const proxy = "http://localhost:5000/api/" || "https://careerprep.onrender.com/api/";
// export const AUTH_API_END_POINT="http://localhost:5000/api/auth/" || "https://careerprep.onrender.com/api/auth/";


export const proxy = process.env.PROXY;
export const AUTH_API_END_POINT= `${proxy}/auth`;


