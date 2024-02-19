/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     spacing:{
      '1px':'1px',
      '5px':'5px',
      '20px':'20px'
      
     },
     height:{
      '40rem': '40rem',
     }
    },
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes:[
      "dim",
      "black",
      "sunset"
    ]
  }
}