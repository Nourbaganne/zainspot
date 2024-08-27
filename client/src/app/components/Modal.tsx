'use client'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaClosedCaptioning, FaExclamationCircle, FaTimes } from 'react-icons/fa'

interface Props {
	title: string;
	subtitle: string;
	buttonText?: string;
	buttonColor?: string;
	onButtonClick?: () => void | undefined;
	children: React.ReactNode
}

const Modal = forwardRef(({children, title, subtitle, buttonText, buttonColor, onButtonClick}: Props, ref: any) => {
  const [open, setOpen] = useState(true)

	useImperativeHandle(ref, () => ({
		open() {
			setOpen(true);
		}
	}));

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {/* Modal Header */}
						<div className="flex items-start justify-between px-4 sm:px-6 py-4">
							{title && <div>
								<DialogTitle className="text-lg font-medium text-gray-900">
									Create New Role
								</DialogTitle>
								{subtitle && <p className='text-sm text-gray-400 mt-2'>Create a new role, give it a name, and check its permissions.</p>}
							</div>}
							
							<button
								onClick={() => setOpen(false)}
								className="p-2 text-gray-400"
							>
								<FaTimes className='h-4 w-4' />
							</button>
						</div>
						{/* Modal Content */}
						<div className='px-4 sm:px-6 py-3'>
							{children}
						</div>
						{/* Action Buttons */}
            {onButtonClick && <div className="bg-gray-50 px-4 sm:px-6 py-3 flex justify-end gap-2">
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="btn btn-outline-gray"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn btn-primary"
              >
                Create Role
              </button>
            </div>}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
});

Modal.displayName = 'Modal';

export default Modal;
