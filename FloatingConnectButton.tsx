import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DragStart {
  x: number;
  y: number;
}

interface ButtonStyles extends React.CSSProperties {
  ':hover'?: React.CSSProperties;
}

// Define the component type explicitly
type FloatingConnectButtonProps = {
  // Add any props here if needed
}

// Export the component with explicit type annotation
export const FloatingConnectButton: React.FC<FloatingConnectButtonProps> = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<DragStart>({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback((): void => {
    setIsDragging(false);
  }, []);

  const connectWithAll = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
    if (isDragging) {
      e.preventDefault();
      return;
    }

    const connectButtons: HTMLButtonElement[] = Array.from(document.querySelectorAll('button'))
      .filter((button): button is HTMLButtonElement => {
        const text = button.textContent?.toLowerCase() || '';
        return text.includes('connect') && button.offsetParent !== null;
      });

    if (connectButtons.length === 0) {
      alert('No connectable profiles available on this page.');
      return;
    }

    connectButtons.forEach((button: HTMLButtonElement) => {
      setTimeout(() => {
        button.click();
        
        setTimeout(() => {
          const sendButton: HTMLButtonElement | undefined = Array.from(document.querySelectorAll('button'))
            .find((btn): btn is HTMLButtonElement => {
              const text = btn.textContent?.toLowerCase() || '';
              return text.includes('send') && btn.offsetParent !== null;
            });
            
          if (sendButton) sendButton.click();
        }, 500);
      }, 2000);
    });

    alert(`Attempting to connect with ${connectButtons.length} profiles.`);
  }, [isDragging]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const buttonStyles: ButtonStyles = {
    position: 'fixed',
    top: '60px',
    right: '30px',
    zIndex: 10000,
    width: '180px',
    height: '30px',
    borderRadius: '10%',
    fontSize: '20px',
    backgroundColor: '#0073b1',
    color: '#fff',
    border: 'none',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: isDragging ? 'grabbing' : 'grab',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.2s',
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    userSelect: 'none',
    ':hover': {
      backgroundColor: '#005582'
    }
  };

  return (
    <button
      style={buttonStyles}
      onMouseDown={handleMouseDown}
      onClick={connectWithAll}
    >
      Connect with all
    </button>
  );
};
