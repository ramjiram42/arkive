export function ArkiveLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
          <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
        
        {/* Outer Ring */}
        <circle cx="100" cy="100" r="95" fill="url(#darkGradient)" />
        <circle cx="100" cy="100" r="85" fill="white" />
        
        {/* Archive Box Shape */}
        <g transform="translate(100, 100)">
          {/* Box Base - Golden */}
          <rect
            x="-45"
            y="-15"
            width="90"
            height="45"
            rx="4"
            fill="url(#goldGradient)"
          />
          
          {/* Box Lid - Dark */}
          <rect
            x="-50"
            y="-35"
            width="100"
            height="25"
            rx="4"
            fill="url(#darkGradient)"
          />
          
          {/* Lid Handle - Bronze/Copper */}
          <rect
            x="-15"
            y="-38"
            width="30"
            height="6"
            rx="3"
            fill="url(#bronzeGradient)"
          />
          
          {/* Document Lines - White */}
          <line x1="-25" y1="-5" x2="25" y2="-5" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-25" y1="5" x2="25" y2="5" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="-25" y1="15" x2="10" y2="15" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Lock Detail - Bronze */}
          <circle cx="0" cy="25" r="6" fill="url(#bronzeGradient)" />
          <rect x="-2" y="25" width="4" height="8" rx="1" fill="url(#bronzeGradient)" />
        </g>
      </svg>
    </div>
  );
}