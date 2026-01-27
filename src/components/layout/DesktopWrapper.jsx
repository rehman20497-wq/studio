export default function DesktopWrapper({ children }) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1440px] 2xl:max-w-[1440px]">
          {children}
        </div>
      </div>
    );
  }
  