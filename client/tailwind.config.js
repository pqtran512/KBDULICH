const defaultColors = require("tailwindcss/colors");
const COLORS = {
  success: {
    100: "#E9F6EC",
    200: "#DFFCE6",
    300: "#88CE97",
    400: "#28A745",
    500: "#20913A",
  },
  info: {
    100: "#E5F2FF",
    200: "#CCE7FF",
    300: "#72B7FB",
    400: "#2395FF",
    500: "#0184FF",
  },
  warning: {
    100: "#FEF6E9",
    200: "#FCF0CB",
    300: "#F8CE8B",
    400: "#FFC107",
    500: "#F3A72E",
  },
  error: {
    100: "#FDEBE9",
    200: "#FCE6EA",
    300: "#F17585",
    400: "#EB3B5B",
    500: "#DA072D",
  },
  primary: {
    1: '#1A6DE3',
    2: '#0051CD',
    3: '#6BB8FF',
    4: '#D3EAFF',
    5: '#ECF6FF',
  },
  secondary: {
    1: '#F59E0B',
    2: '#FCD34D',
    3: '#FE8C48',
    4: '#F99C64',
    4: '#FCC3A2',
  },
  tertiary: {
    1: '#005F59',
    2: '#00A198',
    3: '#A4EEEA',
    4: '#E3F5F4',
    5: '#F8FBFB',
  }, 
  quaternary: {
    1: '#D98905',
    2: '#ED970B',
    3: '#FFA004',
    4: '#FFB741',
    5: '#FDC871',
  },
  background: {
    1: '#FFE2F3',
    2: '#FFE7E7',
    3: '#FFEDEE',
    4: '#FFF1D7',
    5: '#FFFAEA',
    6: '#F2FCF5',
    7: '#D5F2E8',
    8: '#C3EAF0',
    9: '#D7E8FF',
    10: '#CADDF1',
    11: '#DFDCF3',
    12: '#DEE3EC',
  },
  accent: {
    12: '#42526E',
    11: '#5243AA',
    10: '#034A93',
    9: '#2684FF',
    8: '#0C9AB2',
    7: '#00875A',
    6: '#28A745',
    5: '#FFC400',
    4: '#FF8900',
    3: '#F33240',
    2: '#A70000',
    1: '#B5076B',
  },
  custom: {
    1: '#DBDBDB',
  }, 
  'neutral-1': {
    900: '#2C333A',
    800: '#424752',
    700: '#5A6271',
    600: '#6B7280',
    500: '#858F9B',
    400: '#929DAA',
    300: '#A1ACB8',
    200: '#CDD3DB',
    100: '#D2D8E0',
    50: '#DDE2E9',
  },
  'neutral-2': {
    300: '#DAE0E6',
    200: '#E2E7ED',
    100: '#E9EDF2',
    50: '#F2F4F7',
  },
  'neutral-3': {
    300: '#E3E6E9',
    200: '#EBEDEF',
    100: '#F0F1F3',
    50: '#F8F9FB',
  },
  gradient: {
    1: {
      start: "#28A745",
      // mid:'',
      end: "#52BF50",
    },
    2: {
      start: "#0051CD",
      // mid:'',
      end: "#3E89FC",
    },
    3: {
      start: "#A4EEEA",
      mid:'#0696DE',
      end: "#00A198",
    },
    4: {
      start: "#FFB741",
      // mid:'',
      end: "#FFA004",
    },
  },


}

function genarateColorTDS() {
  var colors = [];
  for (const colorName in COLORS) {
    for (const colorOpacity in COLORS[colorName]) {
      colors.push(`${colorName}-${colorOpacity}`);
    }
  }
  if (COLORTAIWIND.length > 0) {
    for (let index = 0; index < COLORTAIWIND.length; index++) {
      const colorName = COLORTAIWIND[index];
      if (defaultColors[colorName])
        for (const colorOpacity in defaultColors[colorName]) {
          colors.push(`${colorName}-${colorOpacity}`);
        }
    }
  }
  var prefixs = [
    "ring",
    "bg",
    "border",
    "text",
    "focus:bg",
    "focus:border",
    "hover:border",
    "hover:bg",
    "disabled:bg",
    "disabled:border",
    "dark:bg",
    "dark:text",
    "dark:border",
    "dark:group-hover:text",
    "dark:hover:bg",
    "dark:hover:text",
  ];

  var result = [];
  for (let index = 0; index < prefixs.length; index++) {
    const prefix = prefixs[index];
    for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
      const color = colors[colorIndex];
      result.push(prefix + "-" + color);
    }
  }

  return result;
}

module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        ...COLORS
      },
      ringColor: {
        ...COLORS,
      },
      borderColor: {
        ...COLORS,
      },
      placeholderColor: {
        ...COLORS,
      },
      fontSize: {
          'heading-1': ['40px', '53px'],
          'heading-2': ['32px', '43px'],
          'heading-3': ['28px', '37px'],
          'heading-4': ['24px', '32px'],
          'body-1': ['16px', '24px'],
          'body-2': ['14px', '20px'],
          'caption-1': ['13px', '22px'],
          'caption-2': ['12px', '18px'],
          'title-1': ['16px', '24px'],
          'title-2': ['14px', '24px'],
          'header-1': ['20px', '28px'],
          'header-2': ['18px', '28px'],
          'display-1': ['80px', 'auto'],
          'display-2': ['72px', 'auto'],
          'display-3': ['64px', 'auto'],
          'display-4': ['56px', 'auto'],
          'display-5': ['48px', 'auto'],
          'display-6': ['40px', 'auto'],
          'button': ['16px', '24px'],
          'button1': ['14px', '20px'],
      },
      fontFamily: {
        prata: ['Prata', 'sans-serif'],
        segoe: ['Segoe UI', 'sans-serif'],
        vampiroOne: ['Vampiro One', 'sans-serif']
      },
      backgroundImage: {
        'mountain':"url('/src/assets/img/home/bg-mountain.png')",
        'mountain-md':"url('/src/assets/img/home/bg-mountain-md.png')",
        'mountain-xl':"url('/src/assets/img/home/bg-mountain-xl.png')",
        'grad': "linear-gradient(to right, rgba(88,255,227,0.9),rgba(137,255,235,0.625),rgba(166,255,240,0.4066),rgba(241,255,253,0))",
        'grad2': "linear-gradient(to bottom, rgba(255,255,255,0.8),rgba(255,245,245,0))",
        'grad3': "linear-gradient(to bottom,rgba(57,57,57,0),rgba(34,34,34,0.8))",
        'blue-grad': "linear-gradient(to right,rgba(26,109,227,1),rgba(0,70,170,1))",
        'coconut':"url('/src/assets/img/home/bg-coconut.png')",
        'coconut-md':"url('/src/assets/img/home/bg-coconut-md.png')",
        'coconut-xl':"url('/src/assets/img/home/bg-coconut-xl.png')",
        'sea':"url('/src/assets/img/home/bg-sea.png')",
        'wallpaper1': "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDk0fHxuYXR1cmV8ZW58MHx8fHwxNjMyMDQwMTg1&ixlib=rb-1.2.1&q=80&w=2000')",
        'wallpaper2': "url('https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2019/01/mark-harpur-748500-unsplash.jpg?w=1500&ssl=1')",
      },
      animation: {
        'header': 'spin 300ms ease-in-out infinite',
      },
      boxShadow: {
        'shad1': '0px 1px 15px 0px rgba(29, 45, 73, 0.14)',
        'shad2': '0 1px 6px 0 rgba(29, 45, 73, 0.102)',
        'shad3': '0 1px 10px 0 rgba(29, 45, 73, 0.102)',
        'menu': '0 10px 15px -5px rgba(29, 45, 73, 0.14)',
        'title': '5px 7px 15px -5px rgba(29, 45, 73, 0.14)',
        'btn': '0 0 2px 0 rgba(66, 52, 52, 0.80)',
        'line': '0px -1px 0px 0px #C4C4C4 inset',
        'white-line': '0px -1px 0px 0px #fff inset',
      },
      dropShadow: {
        'md': '0 0 0 1px rgba(44, 51, 58, 1)',
      },
      keyframes: {
        'fade-right': {
          '0%': {
              opacity: '0',
              transform: 'translateX(-10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateX(0)'
          },
        },
        'fade-left': {
          '0%': {
              opacity: '0',
              transform: 'translateX(10px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateX(0)'
          },
        },
        'fade-down': {
          '0%': {
              opacity: '0',
              transform: 'translateY(-20px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
        },
        'fade-up': {
          '0%': {
              opacity: '0',
              transform: 'translateY(20px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
        },
        'fade': {
          '0%': {opacity: '0',},
          '100%': {opacity: '1',},
        },
      }, 
      animation: {
          'fade-right': 'fade-right 0.5s ease-out',
          'fade-left': 'fade-left 0.5s ease-out',
          'fade-down': 'fade-down 0.3s ease-out',
          'fade-up': 'fade-up 0.3s ease-out',
          'fade': 'fade 0.5s ease-out',
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
      margin: ["group-hover"],
      visibility: ["group-hover"],
    },
  },
  plugins: [
    require('tailwind-scrollbar-variants'),
  ],
};