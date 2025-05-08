
// import React from 'react';
// import { cn } from '@/lib/utils';

// type LogoProps = {
//   variant?: 'default' | 'white';
//   className?: string;
// };

// const Logo: React.FC<LogoProps> = ({ variant = 'default', className }) => {
//   const textColor = variant === 'white' ? 'text-white' : 'text-inda-black';
//   const accentColor = variant === 'white' ? 'text-white' : 'text-inda-blue';

//   return (
//     <div className={cn('flex items-center', className)}>
//       <svg 
//         width="32" 
//         height="32" 
//         viewBox="0 0 32 32" 
//         fill="none" 
//         xmlns="http://www.w3.org/2000/svg"
//         className="mr-2"
//       >
//         <path 
//           d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" 
//           className={variant === 'white' ? 'fill-white' : 'fill-inda-blue'} 
//           fillOpacity="0.2"
//         />
//         <path 
//           d="M22 10H10V22H22V10Z" 
//           className={variant === 'white' ? 'fill-white' : 'fill-inda-blue'} 
//         />
//       </svg>
//       <span className={cn('text-xl font-bold', textColor)}>
//         Inda<span className={accentColor}>social</span>
//       </span>
//     </div>
//   );
// };

// export default Logo;



import React from 'react';
import { cn } from '@/lib/utils';
import favicon from "../assets/favicon.svg"

type LogoProps = {
  variant?: 'default' | 'white';
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ variant = 'default', className }) => {
  const textColor = variant === 'white' ? 'text-white' : 'text-inda-black';
  const accentColor = variant === 'white' ? 'text-white' : 'text-inda-blue';


  return (
    <div className={cn('flex items-center', className)}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 40 40"
        width="40"
        height="40"
      >
        <image
          width="40"
          height="40"
          href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdC
            IFhZWiAAAAAAAAAAAAAAAABhY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAA
            AADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtk
            ZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAA
            ABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAAC
            TAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABi
            AHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAA
            eQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA
            0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABv
            lAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAA
            AAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltw
            YXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAA
            mZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoV
            EREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4e
            Hh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/CABEIAZABkAMBIgACEQEDEQH/xAAb
            AAEBAAIDAQAAAAAAAAAAAAAAAgEGAwUHBP/EABsBAQADAQEBAQAAAAAAAAAAAAACBAUDAQYH/9oA
            DAMBAAIQAxAAAAHUlP0i3KhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhSkYSoSo
            SoSoSoSoSoSoSoSoSoSoSoSoSoSoSoSoSoSoSoSoSoSoZUjGVCVCVCVCVCVCVCVCVCVCVCVCVCVC
            VCVCVCVCVCVCVCVCVCVClIwlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQypGMq
            EqEqEqEqEqEqEqEqEqEqEqEqEqEqEqEqEqEqEqEqEqEqEqFKRhKhKhKhKhKhKhKhKhKhKhKhKhKh
            KhKhKhKhKhKhKhKhKhKhKhTKMcMjDIwyMMjDIwyMMjDIwyMMjDIwyMMjDIwyMMjDIwyMMjDIwyMM
            jDIwyKUjCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVClIwlQlQlQlQlQlQlz+n
            U5eVLxbjKvSa0vNHZd/605terT8lXfSa+9bnNn5M23VNCEqdvJc/qdKfkrZdcsRlTr5KhKhKhKhK
            hKhlSMZUJUJUJcnN578/0cuYeOPk5Iwn1zyr1XFseLY+pt1/m9b8t9Uyeui9zw8nnT5dK3bS78J2
            jWdnl5tmjbt5rQ6ey+J+4eKxcD7/ALNXh8nsXn2+4NjSNI9B0HV5wpoQlQlQlQlQlQlQpSEJUJUe
            zyTSXJi+fyS184Zy+eHL7/S/KvVcez5jGefSzeH0TRd6zrPX9b3/AFXDv1WmbpqOz5w7N8O0Qr9n
            pO+azne715j6d55y7cUfXdvh9OzdP2VG/wAWjb15/a96vHbdXt15U6Ql9fY17vRuWO9SVPYyoSoZ
            UjGVCVZ99nlV735K4qi5uOsw5cHHycznyeq+V+qYtnyv62dDM5d70Te8zvnXe++Ktb6/qe+6i5jV
            2PXdnDh2es7PrPLS3bRN70SFnGMxa499zY+epodp5r6noVifzfJ9fDelwfVxcrv9Py/Sq6ny8HYc
            fX3olNj5KVCVClIwlWDCnssVglWZyc/Jwc8ZZxxo8ub1Pyr1XHs+YfTxct/Mve9E3vNsfHzfD21W
            z1HS910trFrs+s7Pzl2ms7NrPPT3bQd+0SNnijk+e7x3DrO26SjobZoO+aO7fPw/Ri33lnHlzGM4
            jbxFz7Z6ni7Xrdb5aFO+ZKhlSMJUeyo8lT31Uks3xvPMMnn0er+U+rY1vza/h+6/m3veib3m2Oh2
            jT9xrd9f6Xuuls49dn1nZ+cu01badZ56e7aJvfmSz93zdVGrw9T1bbNbx9HZdP2/UnX48cdW7GcE
            bmMZx5bxjPH7Yrr+f5rmRwqX/mJUKUjGVCVCVCVCVCVDn9U8s9Tx7vkf3fE1qPcb35t6Rk99W2/U
            dl4edd0vddL1za7Ppftl532kbhoM9X1jyH17yPzrGc8mrU9W6rtvJsLQ9T1j7+p8n10/Jd+X04+a
            PO/2R8czfRPzO1Xl4KdqUqS4yoUyjDDIwyMMjDIwyMMjn9Q8p+2lZ+BlcrY9N8z+2r3+vYtG5fI7
            Rqt8HSGNg6Dln76d82izm29088rF6tj6vmvvz9R8q+346vbdPk13MffmZXq+GRhkYZGGRhkYZFKR
            jKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhSkYSoSoSoSoSoSoSoSoSoSoSoSo
            SoSoSoSoSoSoSoSoSoSoSoSoZUjGVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVCVC
            lIwlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQlQypGMqEqEqEqEqEqEqEqEqEqEq
            EqEqEqEqEqEqEqEqEqEqEqEqEqFKQhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKhKh
            KhTKMMMjDIwyMMjDIwyMMjDIwyMMjDIwyMMjDIwyMMjDIwyMMjDIwyMMjDIwyKUjGVCVCVCVCVCV
            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
            qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr+qAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            VVVVX//EACYRAQEBAAEBCAMBAQEAAAAAAAARASExQVFhcaGxwfAQgZHR4fH/2gAIAQIBAT8Qqqqq
            qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
            qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqwj3d7jLxl1u3Zw5gbG
            bx156MaZm9/nHSAxWf8Ahf6uS57KxQ3fBP8AXSh1VVVVVVVbnHY29UbeT+WOMzeG3a8vX9K7umfz
            Y36nvrf80nN53rnhjgN3u+W1BvHTmfKuXdffVVVVVVVVuxpN3ePwLc3GsNlxt/XR3C3PfNYat8ff
            WwF3cSpZd8+mNm/D57O1w3jGXR7N9tYtJub07N8GKx91Wj2t8GOGO1VVV/En4a3GY1vMiu9Xqnif
            N9XYWy+7Q1tZ4ur9GZWKZ96N93q3lsOs653/AK71RuZ/P+tIpsZDXm8mFVVYYb+Dcr0rebI9U5Xj
            mfD6PN6J1PNrM2vB1xx98XP9rjgxJjdb1/GbNuKM7PtVVVV/Cq5riY9UlneY+jzeibmvNnGe75dY
            8tR19rlln3ljm9W5PxqzF1ym7zOmfKqqqqqrSxlra7vV8h7Po82yfjMZp3nfbHX+vylrWo63idPG
            pa26VuXG43+/DR2Z6t95+v4yHKZ4cMWZiqqqqqrCRkZxjBNyaiY2bk58mMRu52/tpuOuJbGb2XWu
            xt3euttu0Y9bup7id3b0iqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
            qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
            qqqqqqqqqqqqqqqqqqqqqqqv/8QAKxAAAwABAwIGAgMBAQEBAAAAAAERYSExUUHwcYGRobHBENEg
            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
            hCEIQhCEIQhCEIQhCEIQhCEIQhCH/9k="
          style={{ overflow: 'visible' }}
        />
      </svg>
      <span className={cn('text-xl font-bold pl-4', textColor)}>
        Inda<span className={accentColor}>social</span>
      </span>
    </div>
  );
};

export default Logo;

