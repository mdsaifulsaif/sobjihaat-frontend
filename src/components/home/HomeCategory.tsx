// "use client";

// import React from 'react';
// import Link from 'next/link';
// import {
//     MdOutlinePhoneIphone,
//     MdOutlineCheckroom,
//     MdOutlineHome,
//     MdOutlineFace,
//     MdOutlineSportsSoccer,
//     MdOutlineMenuBook,
//     MdOutlineWatch,
//     MdOutlineHeadphones,
//     MdOutlineChair,
//     MdOutlineCardGiftcard
// } from 'react-icons/md';
// import { HiArrowNarrowRight } from 'react-icons/hi';

// const categories = [
//     { id: 1, name: 'Electronics', icon: MdOutlinePhoneIphone, items: 234, color: '#3B82F6', bgColor: '#EFF6FF' },
//     { id: 2, name: 'Fashion', icon: MdOutlineCheckroom, items: 567, color: '#EC4899', bgColor: '#FDF2F8' },
//     { id: 3, name: 'Home & Living', icon: MdOutlineHome, items: 189, color: '#10B981', bgColor: '#ECFDF5' },
//     { id: 4, name: 'Beauty', icon: MdOutlineFace, items: 342, color: '#F59E0B', bgColor: '#FFFBEB' },
//     { id: 5, name: 'Sports', icon: MdOutlineSportsSoccer, items: 156, color: '#EF4444', bgColor: '#FEF2F2' },
//     { id: 6, name: 'Books', icon: MdOutlineMenuBook, items: 423, color: '#8B5CF6', bgColor: '#F5F3FF' },
//     { id: 7, name: 'Watches', icon: MdOutlineWatch, items: 98, color: '#14B8A6', bgColor: '#F0FDFA' },
//     { id: 8, name: 'Audio', icon: MdOutlineHeadphones, items: 167, color: '#6366F1', bgColor: '#EEF2FF' },
//     { id: 9, name: 'Furniture', icon: MdOutlineChair, items: 245, color: '#84CC16', bgColor: '#F7FEE7' },
//     { id: 10, name: 'Gifts', icon: MdOutlineCardGiftcard, items: 312, color: '#F43F5E', bgColor: '#FFF1F2' },
// ];

// const HomeCategory: React.FC = () => {
//     return (
//         <div className='container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-16'>
//             {/* Section Header - Left Aligned */}
//             <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4'>
//                 <div className='text-left'>
//                     <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>Browse Categories</h2>
//                     <p className='text-gray-500 font-medium'>Find what you're looking for from our curated collection</p>
//                 </div>
//                 <Link
//                     href="/shop"
//                     className='text-[var(--color-primary)] font-bold text-sm flex items-center gap-2 hover:opacity-80 transition-all border-b-2 border-transparent hover:border-[var(--color-primary)] pb-1 w-fit'
//                 >
//                     View All Categories <HiArrowNarrowRight size={18} />
//                 </Link>
//             </div>

//             {/* Categories Grid */}
//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
//                 {categories.map(category => (
//                     <Link href={`/shop?category=${category.id}`} key={category.id} className="block">
//                         <div className='group relative bg-white border border-gray-100 rounded-md p-5 flex items-center gap-5 hover:shadow-2xl hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/20 transition-all duration-300 cursor-pointer overflow-hidden'>
//                             {/* Decorative Background Blur */}
//                             <div
//                                 className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full opacity-10 group-hover:scale-[3] transition-transform duration-500 pointer-events-none"
//                                 style={{ backgroundColor: category.color }}
//                             ></div>

//                             {/* Icon - Left Side */}
//                             <div
//                                 className='w-14 h-14 flex-shrink-0 rounded-md flex items-center justify-center group-hover:bg-white shadow-sm transition-all duration-300 z-10'
//                                 style={{ backgroundColor: category.bgColor }}
//                             >
//                                 <category.icon size={26} style={{ color: category.color }} />
//                             </div>

//                             {/* Text - Left Side */}
//                             <div className="z-10">
//                                 <h3 className='font-bold text-gray-800 text-[15px] mb-0.5 group-hover:text-[var(--color-primary)] transition-colors'>
//                                     {category.name}
//                                 </h3>
//                                 <p className='text-[12px] font-semibold text-gray-400 uppercase tracking-tight'>
//                                     {category.items} Products
//                                 </p>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomeCategory;



"use client";

import React, { useRef, useState, useEffect } from "react";

interface CategoryItem {
  id: number;
  title: string;
  icon: React.ReactNode;
}

const ShopbyCategory = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // আপলোড করা SVG আইকনটি আপাতত সব জায়গায় বসানো হলো
  const defaultIcon = (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.88 5.97506L16.377 7.11748C16.231 7.18416 16.0884 7.25589 15.9482 7.33115V6.18436V5.34143C15.9482 4.26234 16.287 3.21037 16.9168 2.33405L17.5115 1.50657C17.8364 1.05442 17.3515 0.464379 16.845 0.695557L15.0907 1.49618C13.2549 2.33405 12.0771 4.1664 12.0771 6.18436C12.0771 4.1664 10.8992 2.33414 9.06344 1.49618L7.30926 0.695557C6.80272 0.464379 6.31779 1.05442 6.64276 1.50657L7.23744 2.33405C7.86721 3.21037 8.20591 4.26225 8.20591 5.34143V6.18436V7.33115C8.06578 7.25589 7.92316 7.18407 7.77711 7.11748L5.27414 5.97506C4.55135 5.6452 3.85953 6.48702 4.32309 7.13224L5.1716 8.31293C6.07014 9.5633 6.55352 11.0642 6.55352 12.604V13.8067H17.6005V12.604C17.6005 11.0642 18.0839 9.5633 18.9825 8.31293L19.831 7.13224C20.2947 6.48702 19.6028 5.64511 18.88 5.97506Z" fill="#97DA7B"/>
      <path d="M7.77703 7.1173L5.27389 5.97514C4.8783 5.79408 4.493 5.96485 4.30078 6.26176L6.17578 7.1173C7.32995 7.58326 8.06622 7.3756 8.20609 7.33098C8.06622 7.25546 7.92291 7.18424 7.77703 7.1173ZM9.06335 1.49661L7.30935 0.695982C6.95752 0.535514 6.61685 0.770639 6.54992 1.08042L7.4621 1.49661C9.29762 2.33414 12.0771 4.80124 12.0771 6.18453C12.0771 4.16623 10.8997 2.33414 9.06335 1.49661ZM16.8448 0.695982L16.003 1.08042C16.033 1.21686 16.009 1.36875 15.9094 1.50691L15.3148 2.33414C15.3088 2.34272 15.3028 2.3513 15.2959 2.36074C14.3631 3.67624 14.4421 5.46027 15.4538 6.71656L15.9481 7.33098V5.34185C15.9481 4.26233 16.287 3.21028 16.9169 2.33414L17.5116 1.50691C17.8368 1.05468 17.3519 0.46429 16.8448 0.695982ZM18.8803 5.97514L18.2521 6.26176C18.4126 6.50718 18.4392 6.84013 18.2289 7.13189L17.3811 8.31267C16.4827 9.56295 15.9987 11.0638 15.9987 12.6041V13.8064H17.6008V12.6041C17.6008 11.0638 18.0839 9.56295 18.9824 8.31267L19.8311 7.13189C20.2944 6.48744 19.6028 5.64477 18.8803 5.97514Z" fill="#80D261"/>
      <path d="M12.0528 38.1304C7.63935 38.1304 3.698 35.3679 2.19243 31.2192L2.11949 31.0181C0.50021 26.5562 0.50021 21.6672 2.11949 17.2053L2.19243 17.0042C3.698 12.8556 7.63935 10.093 12.0528 10.093H12.1526C16.5411 10.093 20.4657 12.8248 21.9895 16.9402C23.6383 21.393 23.6696 26.2836 22.0778 30.7571L21.9353 31.1573C20.4478 35.3381 16.4904 38.1304 12.0528 38.1304Z" fill="#FFD15B"/>
      <path d="M23.2489 23.9699C23.2489 26.2654 22.8585 28.5609 22.0776 30.7568L21.9351 31.1576C20.448 35.3383 16.4904 38.1307 12.053 38.1307C11.6222 38.1307 11.1957 38.1041 10.7761 38.0526C14.6806 37.5737 18.0358 34.9316 19.3779 31.1576L19.5204 30.7568C20.3021 28.5609 20.6917 26.2646 20.6917 23.9691C20.6917 21.5878 20.2721 19.2074 19.4329 16.9402C18.053 13.2134 14.7046 10.6219 10.8259 10.1653C11.2301 10.1173 11.6394 10.0933 12.053 10.0933H12.1525C16.541 10.0933 20.466 12.8247 21.9892 16.9402C22.8293 19.2074 23.2489 21.5887 23.2489 23.9699Z" fill="#FFC344"/>
      <path d="M37.3076 6.07361C45.3724 14.1384 45.3725 27.2151 37.3076 35.2799C29.2428 43.3447 16.1661 43.3447 8.10132 35.2799L10.4752 32.906L24.1773 21.2408L34.9328 8.44846L37.3076 6.07361Z" fill="#97DA7B"/>
      <path d="M37.3075 35.28C32.9602 39.6273 27.1559 41.631 21.4666 41.292C26.3312 41.0011 31.1127 38.9965 34.8292 35.28C42.4768 27.6324 42.8724 15.478 36.0169 7.36447L37.3075 6.07385C45.373 14.1385 45.373 27.2154 37.3075 35.28Z" fill="#80D261"/>
      <path d="M34.9339 8.44751C41.688 15.2017 41.688 26.1519 34.9339 32.906C28.1797 39.6601 17.2295 39.6602 10.4753 32.906L22.7046 20.6768L34.9339 8.44751Z" fill="#EE6161"/>
      <path d="M21.1668 43.069C25.5279 43.069 29.0633 39.5336 29.0633 35.1725C29.0633 30.8114 25.5279 27.276 21.1668 27.276C16.8057 27.276 13.2703 30.8114 13.2703 35.1725C13.2703 39.5336 16.8057 43.069 21.1668 43.069Z" fill="#FFD15B"/>
      <path d="M29.0635 35.1727C29.0635 39.5336 25.528 43.0691 21.1671 43.0691C20.7886 43.0691 20.4154 43.0425 20.0515 42.9902C23.8847 42.4487 26.8324 39.1552 26.8324 35.1727C26.8324 31.1901 23.8847 27.8967 20.0515 27.3552C20.4154 27.3028 20.7886 27.2762 21.1671 27.2762C25.528 27.2762 29.0635 30.8117 29.0635 35.1727Z" fill="#FFC344"/>
      <path d="M10.0354 42.8146L9.93295 42.7816C9.36711 42.5998 8.76634 42.5998 8.20058 42.7816C5.0705 43.7875 1.81084 41.7203 1.00755 38.2199L0.998796 38.1819C0.610753 36.4912 0.610753 34.7198 0.998796 33.029L1.03415 32.8749C1.82723 29.4189 5.01944 27.3513 8.12558 28.2816L8.2567 28.3209C8.78719 28.4798 9.34626 28.4798 9.87675 28.3209L10.109 28.2514C13.1759 27.3329 16.3353 29.3371 17.1739 32.733L17.2018 32.8465C17.6478 34.6526 17.6478 36.5584 17.2018 38.3644C16.3524 41.8045 13.1262 43.8079 10.0354 42.8146Z" fill="#F79595"/>
      <path d="M17.2016 38.3641C16.5734 40.9067 14.6478 42.665 12.4373 43.0074C13.7211 41.9631 14.6924 40.2263 15.1524 38.3641C15.5986 36.5586 15.5986 34.6528 15.1524 32.8464L15.1249 32.7331C14.5895 30.5638 13.4053 28.7909 11.8203 28.0323C14.2745 28.1293 16.4919 29.9708 17.1741 32.7331L17.2016 32.8464C17.6478 34.6528 17.6478 36.5586 17.2016 38.3641Z" fill="#F47C7C"/>
      <path d="M44 20.6767C44 14.9884 41.7849 9.64057 37.7628 5.61847C37.5114 5.36721 37.104 5.36721 36.8526 5.61847L14.3893 28.0817C12.719 27.1997 11.1925 27.4555 9.44139 27.7621C8.64668 24.8947 6.65404 23.7842 6.54901 23.7277C6.23605 23.559 5.84577 23.6763 5.67724 23.9892C5.5087 24.3022 5.62575 24.6924 5.93879 24.861C5.95742 24.8709 7.30818 25.6251 8.03167 27.5892C5.95115 27.073 3.7342 27.7864 2.2505 29.3067C0.21238 21.8741 2.66317 10.7233 12.1525 10.7366C16.374 10.7366 20.1009 13.5147 21.4928 17.4596C21.6109 17.7948 21.9787 17.9709 22.3137 17.8526C22.649 17.7345 22.8249 17.3669 22.7067 17.0317C21.8918 14.7177 20.4058 12.7194 18.3636 11.3453C18.5465 10.3905 18.937 9.47898 19.5052 8.68848L20.3537 7.50779C21.1686 6.3737 19.9094 4.79836 18.6128 5.38944L16.5919 6.31192C16.5476 4.58426 16.9867 3.25675 18.0341 1.88212C18.3525 1.4389 18.3338 0.857784 17.9872 0.436189C17.6407 0.0144222 17.0742 -0.116355 16.5777 0.109931C14.778 0.931411 13.0421 1.66073 12.0771 3.53469C11.1194 1.67489 9.36699 0.92712 7.57652 0.109931C7.0801 -0.116785 6.51348 0.014508 6.16705 0.436103C5.82055 0.857784 5.80167 1.43882 6.12012 1.88212C7.1623 3.25803 7.61067 4.581 7.56245 6.31192L5.54131 5.38944C4.27104 4.80978 2.96901 6.35045 3.80053 7.50779L4.64904 8.68848C5.22492 9.4898 5.61794 10.4148 5.79763 11.3837C-0.102036 15.3967 -0.73962 24.3281 1.28357 30.5627C-0.337504 33.2423 -0.411303 37.2966 0.99533 40.0708C1.15614 40.3878 1.54341 40.5146 1.8604 40.3538C2.17739 40.1931 2.30414 39.8058 2.14341 39.4888C0.588581 36.4217 1.05385 31.2179 4.26615 29.3483C5.67218 28.53 6.9047 28.7175 8.38907 29.0145C8.44537 29.398 8.4784 29.8108 8.4784 30.2578C8.4784 30.6133 8.76648 30.9014 9.122 30.9014C9.47752 30.9014 9.76559 30.6133 9.76559 30.2578C9.76559 29.8212 9.73907 29.4106 9.69145 29.0242C11.208 28.7454 12.4851 28.4708 13.9331 29.2977C18.0067 31.6239 18.014 39.539 13.9182 41.8239C12.792 42.4521 11.3511 42.6216 10.1298 42.1689C9.43427 41.9456 8.69903 41.9456 8.00352 42.1689C6.64211 42.6067 5.21917 42.4032 3.9973 41.5963C3.70073 41.4003 3.30145 41.482 3.10562 41.7786C2.90971 42.0752 2.99132 42.4744 3.28797 42.6703C4.81946 43.6819 6.68184 43.9459 8.3974 43.3944C8.83513 43.2536 9.298 43.2536 9.7359 43.3944C11.3267 43.9331 13.078 43.7667 14.5453 42.948C15.048 42.6676 15.5101 42.3176 15.9226 41.9107C17.4177 43.0758 19.256 43.7128 21.1668 43.7128C23.33 43.7128 25.3075 42.9039 26.814 41.5732C30.971 40.7598 34.7537 38.7443 37.7628 35.7352C41.7849 31.7129 44 26.3652 44 20.6767ZM5.69432 7.93728L4.84581 6.7566C4.79887 6.60857 4.85259 6.54318 5.00688 6.56051C5.96952 6.99987 6.96845 7.39675 7.90123 7.89798C8.10075 8.00533 8.34188 7.99984 8.53616 7.88357C8.73061 7.76738 8.84954 7.55757 8.84954 7.33111C8.84954 5.12282 8.78947 3.30283 7.38593 1.43796C9.47657 2.39228 11.4334 3.53976 11.4334 6.18431C11.4334 6.53983 11.7215 6.8279 12.077 6.8279C12.4325 6.8279 12.7206 6.53983 12.7206 6.18431C12.7206 3.55349 14.6777 2.39228 16.768 1.43805C15.3647 3.30291 15.3046 5.12282 15.3046 7.33111C15.3046 7.55765 15.4237 7.76738 15.6181 7.88357C15.8125 7.99967 16.0536 8.00516 16.2531 7.89781C17.1857 7.39624 18.1843 6.99987 19.1471 6.56043C19.3014 6.54309 19.3551 6.60848 19.3082 6.75651L18.4599 7.93728C17.8717 8.75593 17.4435 9.68356 17.1983 10.6592C15.6415 9.8654 13.9233 9.44938 12.1526 9.44938C10.3531 9.43496 8.5625 9.86488 6.96356 10.6899C6.7196 9.70295 6.28899 8.76477 5.69432 7.93728ZM16.7479 40.9224C18.863 37.8586 18.7652 32.6402 16.3823 29.7235C17.7054 28.5572 19.3821 27.9196 21.1668 27.9196C25.166 27.9196 28.4198 31.1732 28.4198 35.1725C28.4198 39.1717 25.1661 42.4254 21.1668 42.4254C19.5589 42.4254 18.0113 41.8946 16.7479 40.9224ZM28.2772 39.8973C28.7989 39.1149 29.1953 38.2421 29.4367 37.3075C31.6684 36.406 33.6699 35.0802 35.389 33.3611C37.9028 30.8472 39.5987 27.6835 40.2932 24.212C40.3629 23.8634 40.1369 23.5243 39.7883 23.4546C39.4396 23.3847 39.1007 23.6109 39.031 23.9594C38.3864 27.1811 36.8124 30.1174 34.4787 32.451C33.0725 33.8572 31.4629 34.9793 29.6839 35.7989C30.0389 30.9241 26.0571 26.6324 21.1668 26.6324C19.0813 26.6324 17.1199 27.3703 15.5677 28.7238L34.9253 9.36614C37.834 12.5023 39.4026 16.5598 39.3548 20.8624C39.3509 21.2178 39.6358 21.5092 39.9913 21.5131C40.3462 21.5165 40.638 21.2321 40.642 20.8766C40.6935 16.2248 38.9905 11.8398 35.8351 8.45628L37.3006 6.99078C40.7959 10.7124 42.7128 15.5471 42.7128 20.6767C42.7128 26.0212 40.6316 31.0458 36.8526 34.8247C34.444 37.2334 31.5081 38.9648 28.2772 39.8973ZM30.8082 27.8701C30.5568 27.6188 30.1493 27.6188 29.898 27.8701C29.6466 28.1215 29.6466 28.5289 29.898 28.7803L30.8699 29.7522C30.9956 29.8778 31.1604 29.9406 31.325 29.9406C31.4897 29.9406 31.6545 29.8778 31.7802 29.7522C32.0315 29.5008 32.0315 29.0933 31.7802 28.842L30.8082 27.8701Z" fill="black"/>
      <path d="M34.2856 24.7339L33.0329 24.1757C32.7082 24.0308 32.3278 24.1771 32.1831 24.5016C32.0384 24.8263 32.1844 25.2068 32.509 25.3514L33.7618 25.9096C33.8469 25.9475 33.9358 25.9655 34.0234 25.9655C34.2698 25.9655 34.5048 25.8232 34.6116 25.5837C34.7562 25.259 34.6103 24.8786 34.2856 24.7339Z" fill="black"/>
      <path d="M35.109 19.9704L33.7466 19.9021C33.7356 19.9015 33.7247 19.9012 33.7138 19.9012C33.3732 19.9012 33.0888 20.1685 33.0716 20.5126C33.0538 20.8677 33.3272 21.1698 33.6821 21.1876L35.0444 21.2559C35.0555 21.2565 35.0664 21.2567 35.0772 21.2567C35.4179 21.2567 35.7023 20.9894 35.7194 20.6454C35.7373 20.2904 35.4639 19.9882 35.109 19.9704Z" fill="black"/>
      <path d="M33.0545 16.8899C33.1223 16.8899 33.1914 16.879 33.2592 16.8563L34.5449 16.4253C34.882 16.3123 35.0636 15.9475 34.9506 15.6105C34.8377 15.2734 34.4726 15.0919 34.1359 15.2048L32.8501 15.6358C32.5131 15.7488 32.3315 16.1136 32.4444 16.4506C32.5346 16.7198 32.7854 16.8899 33.0545 16.8899Z" fill="black"/>
      <path d="M12.0771 18.5986C12.2417 18.5986 12.4065 18.5358 12.5321 18.4102L13.9502 16.9922C14.2016 16.7409 14.2016 16.3334 13.9503 16.0821C13.6989 15.8308 13.2914 15.8307 13.0401 16.082L12.0771 17.045L11.114 16.082C10.8627 15.8308 10.4552 15.8307 10.2039 16.0821C9.95253 16.3334 9.95253 16.741 10.204 16.9922L11.622 18.4102C11.7476 18.5357 11.9124 18.5986 12.0771 18.5986Z" fill="black"/>
      <path d="M17.8818 18.5986C18.0464 18.5986 18.2112 18.5358 18.3368 18.4102L19.7549 16.9922C20.0063 16.7409 20.0063 16.3334 19.755 16.0821C19.5035 15.8308 19.096 15.8307 18.8448 16.082L17.8818 17.045L16.9187 16.082C16.6674 15.8308 16.2599 15.8307 16.0086 16.0821C15.7572 16.3334 15.7572 16.741 16.0087 16.9922L17.4267 18.4102C17.5523 18.5357 17.7171 18.5986 17.8818 18.5986Z" fill="black"/>
      <path d="M10.1095 20.1464L9.14656 21.1094L8.18367 20.1464C7.93224 19.8951 7.52472 19.895 7.27354 20.1464C7.02211 20.3977 7.02211 20.8052 7.27346 21.0565L8.69142 22.4745C8.81216 22.5953 8.9758 22.663 9.14656 22.663C9.31733 22.663 9.48089 22.5953 9.60171 22.4746L11.0198 21.0566C11.2711 20.8051 11.2711 20.3977 11.0198 20.1464C10.7684 19.8951 10.361 19.8951 10.1095 20.1464Z" fill="black"/>
      <path d="M14.4961 22.4745C14.6168 22.5953 14.7805 22.663 14.9513 22.663C15.122 22.663 15.2856 22.5953 15.4064 22.4746L16.8244 21.0566C17.0758 20.8051 17.0758 20.3977 16.8244 20.1464C16.573 19.8951 16.1656 19.8951 15.9142 20.1464L14.9513 21.1094L13.9884 20.1464C13.737 19.8951 13.3295 19.895 13.0782 20.1464C12.8268 20.3977 12.8268 20.8052 13.0781 21.0565L14.4961 22.4745Z" fill="black"/>
      <path d="M22.607 31.2885C22.9624 31.2885 23.2506 31.0004 23.2506 30.6449C23.2506 30.2895 22.9624 30.0013 22.607 30.0013C22.2515 30.0013 21.9634 30.2895 21.9634 30.6449C21.9634 31.0004 22.2515 31.2885 22.607 31.2885Z" fill="black"/>
    </svg>
  );

  const categories: CategoryItem[] = [
    { id: 1, title: "Vegetables", icon: defaultIcon },
    { id: 2, title: "Fruits", icon: defaultIcon },
    { id: 3, title: "Rice & Dal", icon: defaultIcon },
    { id: 4, title: "Fish", icon: defaultIcon },
    { id: 5, title: "Meat", icon: defaultIcon },
    { id: 6, title: "Dairy", icon: defaultIcon },
    { id: 7, title: "Eggs", icon: defaultIcon },
    { id: 8, title: "Bakery", icon: defaultIcon },
    { id: 9, title: "Spices", icon: defaultIcon },
  ];

  // স্ক্রোল পজিশন চেক করে অ্যারো বাটন হাইড বা শো করার লজিক
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollWidth > clientWidth && scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
      
      // ডম রেন্ডারিং শেষ হওয়ার পর পারফেক্টলি ক্যালকুলেট করার জন্য ডিলে
      const timer = setTimeout(() => {
        checkScrollPosition();
      }, 100);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
        clearTimeout(timer);
      };
    }
  }, []);

  // অ্যারো বাটনে ক্লিক করলে মুভ করার লজিক
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // এক ক্লিকে ৩০০ পিক্সেল মুভ করবে
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-8 select-none relative">
      
      {/* Header Section: Title and 'See all' Link */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h4 className="text-[#0E2038] h4">
          Shop by Category
        </h4>
      </div>

      {/* Categories Slider Wrapper */}
      <div className="relative flex items-center w-full">
        
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-2 z-30 bg-white border border-[#E9E9E9] text-[#1E1E1E] hover:text-[#37651B] w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all focus:outline-none hover:scale-105"
            aria-label="Scroll Left"
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Categories Horizontal Scroll List */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-4 md:gap-[12px] overflow-x-auto scroll-smooth w-full py-2 px-1"
          style={{
            scrollbarWidth: "none", /* Firefox */
            msOverflowStyle: "none", /* IE/Edge */
          }}
        >
          {/* Chrome, Safari থেকে স্ক্রোলবার হাইড করার গ্লোবাল স্টাইল */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {categories.map((category) => (
            <div
              key={category.id}
              className="w-[128px] h-[108px] bg-white border border-[#E9E9E9] rounded-[16px] p-4 flex flex-col items-center justify-center gap-2 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_6px_20px_0px_rgba(0,0,0,0.1)] cursor-pointer flex-shrink-0"
            >
              {/* SVG Wrapper */}
              <div className="w-[44px] h-[44px] flex items-center justify-center flex-shrink-0">
                {category.icon}
              </div>

              {/* Category Text Title */}
              <span className="text-[#0E2038] body-medium text-center truncate w-full">
                {category.title}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 z-30 bg-white border border-[#E9E9E9] text-[#1E1E1E] hover:text-[#37651B] w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all focus:outline-none hover:scale-105"
            aria-label="Scroll Right"
          >
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

      </div>

    </div>
  );
};

export default ShopbyCategory;