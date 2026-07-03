import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    // এখানে top-0 z-50 এবং backdrop-blur/shadow অ্যাড করা হয়েছে যাতে স্ক্রোল করলে নিচে কনটেন্ট দেখা যায় এবং নেভবার উপরে আটকে থাকে
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-all duration-200">
      {/* --- 1. Top Banner Bar --- */}
      {/* <div className="w-full bg-[#2A3C1B] text-[#FFFDF6] py-2 subtext-large-medium">
        <div className="max-w-7xl px-4 mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div>
            Free delivery on orders <span className="font-semibold">৳500+</span>
          </div>
          <div className="hidden md:block font-medium">
            Fresh products delivered daily
          </div>
          <div className="flex items-center gap-3 opacity-90">
            <span className="hover:underline cursor-pointer">Track Order</span>
            <span className="opacity-40">|</span>
            <span>Contact: 01700000000</span>
          </div>
        </div>
      </div> */}

      {/* --- 2. Main Navbar Action Row --- */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 md:gap-8">
        {/* Brand Logo Section */}
        {/* মোবাইলেও যেন লোগোটা তার রেশিও ঠিক রাখে এবং কুঁচকে না যায় */}
        <div className="flex items-center flex-shrink-0 cursor-pointer select-none max-w-[130px] sm:max-w-[180px]">
          <Image
            src="/img/shared/logo.png"
            alt="Khati Bazar"
            className="object-contain w-full h-auto"
            width={180} 
            height={50}
            priority
          />
        </div>

        {/* --- Search Block (Hidden on mobile, block on md screens) --- */}
        <div className="hidden md:flex items-center flex-1 max-w-[500px] h-[44px] bg-white border border-[#E9E9E9] rounded-lg pl-3 overflow-hidden">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path
              d="M15.75 15.75L11.2533 11.2533M11.2533 11.2533C12.3663 10.1398 13.0546 8.60184 13.0546 6.90305C13.0546 3.50481 10.3001 0.75 6.9023 0.75C3.50448 0.75 0.75 3.50481 0.75 6.90305C0.75 10.3013 3.50448 13.0561 6.9023 13.0561C8.60154 13.0561 10.1399 12.3671 11.2533 11.2533Z"
              stroke="#7F8482"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products, brands..."
            className="w-full bg-transparent border-none outline-none pl-2 text-sm text-[#0E2038] placeholder-[#7F8482] subtext-large-regular font-medium"
          />
          <button
            style={{ width: "125px", height: "44px" }}
            className="bg-[#37651B] hover:bg-[#2C5215] text-white flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 transition-colors duration-200 flex-shrink-0"
          >
            <span className="body/body-medium font-medium tracking-normal select-none">
              Search
            </span>
          </button>
        </div>

        {/* --- Action Buttons Segment --- */}
        {/* এখানে মোবাইলের জন্য গ্যাপ ও ফ্লেক্স র‍্যাপ হ্যান্ডেল করা হয়েছে যাতে কোনো বাটন স্ক্রিনের বাইরে না যায় */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
          {/* Location Button */}
          {/* মোবাইলে স্পেস নষ্ট না করে শুধু আইকন দেখাবে এবং sm স্ক্রিন থেকে ফুল উইডথ ও টেক্সট ফিরে আসবে */}
          <button
            style={{ height: "44px" }}
            className="border border-[#E9E9E9] bg-white hover:bg-gray-50 flex items-center justify-center gap-2 rounded-lg transition-all duration-200 group w-11 sm:w-[129px] px-2 sm:px-4 py-2"
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 transition-transform group-hover:scale-105"
            >
              <path
                d="M7.54649 0.75C3.40435 0.75 0.0463581 4.08333 0.879823 8.25C1.404 10.8705 3.90571 13.3261 5.69025 14.7878C6.37336 15.3473 6.71492 15.6271 7.27285 15.7042C7.42394 15.725 7.66905 15.725 7.82014 15.7042C8.37807 15.6271 8.71963 15.3473 9.40275 14.7878C11.1873 13.3262 13.6891 10.8705 14.2132 8.25C15.0464 4.08333 11.6886 0.75 7.54649 0.75Z"
                stroke="#0E2038"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M10.0464 7.54167C10.0464 8.92238 8.9271 10.0417 7.54639 10.0417C6.16568 10.0417 5.04639 8.92238 5.04639 7.54167C5.04639 6.16095 6.16568 5.04167 7.54639 5.04167C8.9271 5.04167 10.0464 6.16095 10.0464 7.54167Z"
                stroke="#0E2038"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline font-[family-name:var(--font-montserrat)] font-semibold text-base text-[#0E2038]">
              Barishal
            </span>
          </button>

          {/* Wishlist Button */}
          <button
            style={{ width: "44px", height: "44px" }}
            className="hidden sm:flex border border-[#E9E9E9] bg-white hover:bg-gray-50 items-center justify-center rounded-lg p-2 transition-all duration-200 group"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:scale-110"
            >
              <path
                d="M20.894 9.44503C19.8474 15.4754 11.9949 20.5 11.9949 20.5C11.9949 20.5 4.08463 15.4753 3.09582 9.44536C2.10702 3.41545 9.02855 1.40524 11.9949 6.0795C14.9613 1.40515 21.9407 3.41463 20.894 9.44503Z"
                stroke="#0E2038"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Profile Button */}
          <button
            style={{ width: "44px", height: "44px" }}
            className="border border-[#E9E9E9] bg-white hover:bg-gray-50 flex items-center justify-center rounded-lg p-2 transition-all duration-200 group"
          >
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:scale-105"
            >
              <path
                d="M1.05391 13.8711C2.1677 11.365 4.65287 9.75 7.39527 9.75H10.3757C13.1181 9.75 15.6033 11.365 16.7171 13.8711C17.7369 16.1656 16.0573 18.75 13.5464 18.75H4.22459C1.71369 18.75 0.0341348 16.1656 1.05391 13.8711Z"
                stroke="#0E2038"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M5.8855 3.75C5.8855 2.09315 7.22864 0.75 8.8855 0.75C10.5424 0.75 11.8855 2.09315 11.8855 3.75C11.8855 5.40685 10.5424 6.75 8.8855 6.75C7.22864 6.75 5.8855 5.40685 5.8855 3.75Z"
                stroke="#0E2038"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Cart Button */}
          {/* মোবাইলে স্পেস সেভ করার জন্য শুধু আইকন উইথ রিলেটিভ ব্যাজ থাকবে, sm স্ক্রিন থেকে আগের উইডথ ও টেক্সট দেখাবে */}
          <button
            style={{ height: "44px" }}
            className="bg-[#37651B] hover:bg-[#2C5215] text-white flex items-center justify-center gap-2 rounded-lg transition-colors duration-200 group flex-shrink-0 relative w-11 sm:w-[123px] px-2 sm:px-5 py-2.5"
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 transition-transform group-hover:scale-105"
            >
              <path
                d="M0.75 0C0.335786 0 0 0.335786 0 0.75C0 1.16421 0.335786 1.5 0.75 1.5V0.75V0ZM13.772 8.70361L13.1048 8.36104L13.772 8.70361ZM5.41667 2.41667V3.16667H12.0873V2.41667V1.66667H5.41667V2.41667ZM14.7561 6.78694L14.0889 6.44437L13.1048 8.36104L13.772 8.70361L14.4392 9.04618L15.4233 7.12951L14.7561 6.78694ZM11.1032 10.3333V9.58333H5.33333V10.3333V11.0833H11.1032V10.3333ZM2.41667 7.41667H3.16667V5.41667H2.41667H1.66667V7.41667H2.41667ZM2.41667 7.41667H3.16667V2.41667H2.41667H1.66667V7.41667H2.41667ZM5.33333 10.3333V9.58333C4.13671 9.58333 3.16667 8.61328 3.16667 7.41667H2.41667H1.66667C1.66667 9.44171 3.30829 11.0833 5.33333 11.0833V10.3333ZM13.772 8.70361L13.1048 8.36104C12.7195 9.11147 11.9468 9.58333 11.1032 9.58333V10.3333V11.0833C12.5092 11.0833 13.797 10.2969 14.4392 9.04618L13.772 8.70361ZM12.0873 2.41667V3.16667C13.7705 3.16667 14.8577 4.94706 14.0889 6.44437L14.7561 6.78694L15.4233 7.12951C16.7046 4.63399 14.8926 1.66667 12.0873 1.66667V2.41667ZM2.41667 2.41667H3.16667C3.16667 1.08198 2.08469 0 0.75 0V0.75V1.5C1.25626 1.5 1.66667 1.91041 1.66667 2.41667H2.41667ZM5.41667 2.41667V1.66667C3.3456 1.66667 1.66667 3.3456 1.66667 5.41667H2.41667H3.16667C3.16667 4.17403 4.17403 3.16667 5.41667 3.16667V2.41667Z"
                fill="white"
              />
            </svg>
            <span className="hidden sm:inline font-[family-name:var(--font-montserrat)] font-semibold text-base">
              Cart(3)
            </span>
            {/* মোবাইল ভিউতে কাউন্ট যেন বোঝা যায় সেজন্য ছোট্ট একটি ডট/ব্যাজ */}
            <span className="sm:hidden absolute top-1 right-1 bg-red-500 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </button>
        </div>
      </div>

      {/* --- 3. Mobile Search Sub-Row --- */}
      <div className="w-full px-4 sm:px-6 pb-4 md:hidden">
        <div className="flex items-center w-full h-[44px] bg-[#F7F7F7] border border-[#E9E9E9] rounded-lg pl-3 overflow-hidden">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <path
              d="M15.75 15.75L11.2533 11.2533M11.2533 11.2533C12.3663 10.1398 13.0546 8.60184 13.0546 6.90305C13.0546 3.50481 10.3001 0.75 6.9023 0.75C3.50448 0.75 0.75 3.50481 0.75 6.90305C0.75 10.3013 3.50448 13.0561 6.9023 13.0561C8.60154 13.0561 10.1399 12.3671 11.2533 11.2533Z"
              stroke="#7F8482"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search products, brands..."
            className="w-full bg-transparent border-none outline-none pl-2 text-sm text-[#0E2038] font-[family-name:var(--font-montserrat)]"
          />
          <button className="bg-[#37651B] h-full text-white px-4 text-sm font-medium font-[family-name:var(--font-montserrat)] flex-shrink-0">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;