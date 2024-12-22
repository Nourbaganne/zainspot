import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
    const [mounted, setMounted] = useState(false);
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const element = document.createElement('div');
        document.body.appendChild(element);
        setPortalElement(element);
        setMounted(true);
        
        return () => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, []);

    if (!mounted || !portalElement) {
        return null;
    }

    return createPortal(children, portalElement);
};

export default Portal;
