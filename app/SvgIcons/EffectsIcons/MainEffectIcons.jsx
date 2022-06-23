import Svg, { Path } from 'react-native-svg';
import React from 'react';
import { View } from 'react-native';

function MainEffectIcons({ title, color, size }) {
  const icons = {
    Перевести: (
      <Svg viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M10.9647 19.5388H10.2798L5.21291 24.9592V19.5388C4.16832 19.5388 3.16651 19.1234 2.42787 18.3839C1.68923 17.6444 1.27427 16.6415 1.27427 15.5957V5.20362C1.27427 4.15786 1.68923 3.15493 2.42787 2.41546C3.16651 1.676 4.16832 1.26057 5.21291 1.26057H15.5959C16.533 1.26107 17.4391 1.59624 18.1514 2.2058C18.8637 2.81537 19.3354 3.65933 19.4817 4.58594H20.7534C20.6015 3.32286 19.9931 2.15912 19.043 1.31429C18.0928 0.469458 16.8667 0.00195951 15.5959 0H5.19781C3.81967 0.00133496 2.49836 0.55 1.52388 1.52558C0.549389 2.50116 0.00133346 3.82394 0 5.20362V15.5957C0.00330292 16.7553 0.392631 17.8806 1.10641 18.7938C1.82019 19.707 2.81769 20.356 3.94116 20.638V28.1459L10.8136 20.7943H10.9647V19.5388Z"
          fill={color}
        />
        <Path
          d="M7.87225 12.5855H6.27564L5.99863 13.8234H4.75458L6.42926 6.99866H7.7136L9.38828 13.8234H8.14171L7.87225 12.5855ZM7.62042 11.4434L7.34844 10.1829C7.25023 9.71393 7.14446 8.96263 7.07647 8.5063H7.04625C6.98833 8.96263 6.88004 9.71393 6.79442 10.1829L6.51992 11.4434H7.62042Z"
          fill={color}
        />
        <Path
          d="M11.6497 8.53908C10.5593 8.53908 9.88691 9.17188 9.83906 10.2156H10.9874C10.9919 10.1359 11.0122 10.0578 11.0472 9.98603C11.0822 9.91424 11.1311 9.85017 11.1912 9.79757C11.2512 9.74497 11.3211 9.7049 11.3968 9.67971C11.4726 9.65453 11.5525 9.64473 11.6321 9.6509C11.7184 9.64948 11.8041 9.66578 11.8839 9.69879C11.9736 9.32592 12.1019 8.96344 12.2667 8.61723C12.0655 8.5636 11.858 8.53731 11.6497 8.53908Z"
          fill={color}
        />
        <Path
          d="M11.5137 12.9561C11.4295 12.9674 11.3439 12.9599 11.2629 12.9342C11.1819 12.9085 11.1076 12.8652 11.0453 12.8073C10.983 12.7495 10.9342 12.6787 10.9024 12.5998C10.8706 12.5209 10.8567 12.4359 10.8615 12.351C10.8615 11.9325 11.1435 11.7081 11.6321 11.7081H11.7202V11.0501C11.7202 10.9442 11.7202 10.8383 11.7202 10.7325H11.6019C10.4712 10.7325 9.68292 11.2594 9.68292 12.351C9.68292 13.2965 10.2873 13.9595 11.2317 13.9595C11.3943 13.9612 11.556 13.9357 11.7102 13.8839V12.9284C11.646 12.9451 11.5801 12.9544 11.5137 12.9561Z"
          fill={color}
        />
        <Path
          d="M22.6119 19.864C24.1669 19.864 25.4274 18.6021 25.4274 17.0454C25.4274 15.4887 24.1669 14.2268 22.6119 14.2268C21.057 14.2268 19.7965 15.4887 19.7965 17.0454C19.7965 18.6021 21.057 19.864 22.6119 19.864Z"
          fill={color}
        />
        <Path
          d="M27.8022 5.8465H17.4217C16.0436 5.84784 14.7223 6.39651 13.7478 7.37209C12.7733 8.34767 12.2252 9.67045 12.2239 11.0501V21.4448C12.2252 22.8244 12.7733 24.1472 13.7478 25.1228C14.7223 26.0984 16.0436 26.647 17.4217 26.6484H22.1864L29.0613 34V26.4946C30.1844 26.2121 31.1813 25.5629 31.8946 24.6498C32.6079 23.7366 32.9968 22.6115 33 21.4523V11.0501C32.9987 9.67045 32.4506 8.34767 31.4761 7.37209C30.5016 6.39651 29.1803 5.84784 27.8022 5.8465ZM26.606 13.0191H24.7727C25.4492 13.4814 25.96 14.1484 26.2302 14.9225C26.5004 15.6965 26.5159 16.5369 26.2743 17.3204C26.0326 18.1039 25.5467 18.7893 24.8876 19.2761C24.2285 19.763 23.431 20.0256 22.6119 20.0256C21.7929 20.0256 20.9954 19.763 20.3363 19.2761C19.6772 18.7893 19.1913 18.1039 18.9496 17.3204C18.708 16.5369 18.7235 15.6965 18.9937 14.9225C19.2639 14.1484 19.7747 13.4814 20.4512 13.0191H18.6204V12.351H26.606V13.0191Z"
          fill={color}
        />
      </Svg>
    ),
    Качество: (
      <Svg viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M15.0489 0.927052C15.3483 0.0057416 16.6517 0.00573993 16.9511 0.927051L19.8167 9.74671C19.9506 10.1587 20.3346 10.4377 20.7678 10.4377H30.0413C31.0101 10.4377 31.4128 11.6773 30.6291 12.2467L23.1267 17.6976C22.7762 17.9522 22.6295 18.4036 22.7634 18.8156L25.6291 27.6353C25.9284 28.5566 24.874 29.3227 24.0902 28.7533L16.5878 23.3024C16.2373 23.0478 15.7627 23.0478 15.4122 23.3024L7.90976 28.7533C7.12605 29.3227 6.07157 28.5566 6.37092 27.6353L9.2366 18.8156C9.37048 18.4036 9.22382 17.9522 8.87333 17.6976L1.37088 12.2467C0.587169 11.6773 0.989944 10.4377 1.95867 10.4377H11.2322C11.6654 10.4377 12.0494 10.1587 12.1833 9.74671L15.0489 0.927052Z"
          fill={color}
        />
      </Svg>
    ),
    Цензура: (
      <Svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M13.1567 7.05078H12.8442V7.63172H13.1567C13.3886 7.63172 13.5049 7.52432 13.5049 7.34288C13.5049 7.16144 13.3886 7.05078 13.1567 7.05078Z"
          fill={color}
        />
        <Path
          d="M10.8858 7.0332C10.5856 7.0332 10.3496 7.25777 10.3496 7.60275C10.3496 7.94773 10.5856 8.17229 10.8858 8.17229C11.186 8.17229 11.4212 7.94854 11.4212 7.60275C11.4212 7.25695 11.186 7.0332 10.8858 7.0332Z"
          fill={color}
        />
        <Path
          d="M18.9366 5.39258H1.06342C0.781386 5.39258 0.5109 5.50462 0.311469 5.70405C0.112039 5.90348 0 6.17396 0 6.456L0 8.76022C0.000215682 9.04212 0.11235 9.31239 0.311757 9.51165C0.511164 9.7109 0.781527 9.82283 1.06342 9.82283H18.9366C19.2185 9.82283 19.4888 9.7109 19.6882 9.51165C19.8876 9.31239 19.9998 9.04212 20 8.76022V6.456C20 6.17396 19.888 5.90348 19.6885 5.70405C19.4891 5.50462 19.2186 5.39258 18.9366 5.39258ZM2.78671 8.16789C2.87737 8.16789 2.96679 8.14688 3.04796 8.10651C3.12914 8.06613 3.19985 8.00749 3.25455 7.93519L3.61173 8.26065C3.4189 8.50474 3.12355 8.63492 2.75823 8.63492C2.12929 8.63492 1.66714 8.20695 1.66714 7.60323C1.66714 6.99951 2.12929 6.5691 2.75823 6.5691C3.12436 6.5691 3.4189 6.70253 3.61173 6.94337L3.25455 7.26882C3.19985 7.19652 3.12914 7.13788 3.04796 7.09751C2.96679 7.05713 2.87737 7.03612 2.78671 7.03612C2.46125 7.03612 2.23425 7.26313 2.23425 7.60567C2.23425 7.94821 2.46044 8.16789 2.78671 8.16789ZM5.45136 8.59261H3.86152V6.60897H5.41719V7.04263H4.41642V7.37704H5.2984V7.79606H4.41642V8.15894H5.45136V8.59261ZM7.64818 8.59261H7.19173L6.31626 7.53488V8.59261H5.76624V6.60897H6.22839L7.10386 7.66669V6.60897H7.65388L7.64818 8.59261ZM8.74252 8.63248C8.41707 8.63248 8.09162 8.54461 7.90611 8.41442L8.0908 8.00028C8.28547 8.12457 8.51078 8.19245 8.74171 8.19637C8.97441 8.19637 9.06717 8.13046 9.06717 8.03364C9.06717 7.71876 7.93865 7.95228 7.93865 7.21187C7.93865 6.85712 8.22749 6.56828 8.81738 6.56828C9.06821 6.56409 9.31599 6.62373 9.53745 6.74159L9.37147 7.1598C9.2039 7.06408 9.01518 7.01152 8.82226 7.00683C8.58631 7.00683 8.50169 7.0882 8.50169 7.18502C8.50169 7.48851 9.62695 7.2615 9.62695 7.99296C9.62695 8.33794 9.33811 8.63248 8.74822 8.63248H8.74252ZM10.8799 8.63248C10.2453 8.63248 9.77747 8.19637 9.77747 7.60079C9.77747 7.00521 10.2518 6.5691 10.8856 6.5691C11.5195 6.5691 11.9881 7.00602 11.9881 7.60079C11.9881 8.19556 11.5203 8.63248 10.8856 8.63248H10.8799ZM13.5047 8.59261L13.1451 8.06537H12.8384V8.59261H12.2859V6.60897H13.1923C13.7342 6.60897 14.0743 6.88967 14.0743 7.34124C14.0795 7.47247 14.0453 7.60225 13.9761 7.71389C13.907 7.82554 13.806 7.91394 13.6862 7.96774L14.1142 8.59098L13.5047 8.59261ZM15.9684 8.59261H14.381V6.60897H15.9367V7.04263H14.9367V7.37704H15.8179V7.79606H14.9367V8.15894H15.9741L15.9684 8.59261ZM17.2182 8.59261H16.2857V6.60897H17.2239C17.8813 6.60897 18.332 6.99137 18.332 7.60079C18.332 8.2102 17.8813 8.59261 17.2239 8.59261H17.2182Z"
          fill={color}
        />
        <Path
          d="M17.2011 7.05566H16.8472V8.14431H17.2011C17.5388 8.14431 17.7658 7.94334 17.7658 7.59999C17.7658 7.25663 17.5388 7.05566 17.2011 7.05566Z"
          fill={color}
        />
        <Path
          d="M16.0523 10.2295C15.7757 10.8655 15.4009 11.4542 14.9417 11.9739L13.1981 10.2295H11.7653L14.2151 12.6794C13.4278 13.3351 12.4984 13.7982 11.5007 14.0319C10.5031 14.2656 9.46466 14.2634 8.46799 14.0256C7.47131 13.7878 6.54382 13.3209 5.75917 12.6619C4.97452 12.0029 4.35433 11.1701 3.94786 10.2295H2.85596C3.39313 11.692 4.36624 12.9545 5.64385 13.8463C6.92147 14.7381 8.44201 15.2163 10.0001 15.2163C11.5582 15.2163 13.0787 14.7381 14.3563 13.8463C15.6339 12.9545 16.6071 11.692 17.1442 10.2295H16.0523Z"
          fill={color}
        />
        <Path
          d="M3.94769 4.98529C4.19584 4.41059 4.52459 3.87416 4.92406 3.39219L6.52123 4.98529H7.95404L5.63436 2.66562C6.41411 1.97603 7.34611 1.48094 8.35404 1.22091C9.36196 0.960879 10.4172 0.943296 11.4332 1.1696C12.4492 1.39591 13.3972 1.85966 14.1995 2.52289C15.0018 3.18612 15.6355 4.02996 16.0489 4.98529H17.1408C16.6033 3.52309 15.63 2.26104 14.3525 1.36953C13.0749 0.478025 11.5545 0 9.99667 0C8.4388 0 6.91845 0.478025 5.64088 1.36953C4.36331 2.26104 3.39006 3.52309 2.85254 4.98529H3.94769Z"
          fill={color}
        />
      </Svg>
    ),
  };

  return <View style={{ width: size, height: size }}>{icons[title]}</View>;
}

export default MainEffectIcons;
