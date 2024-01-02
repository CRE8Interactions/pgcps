import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button
} from '@chakra-ui/react'

import { useRef } from 'react'

export default function ConfirmationAlert({ isOpen, onOpen, onClose, setOnClose, setIsOpen, selectedHour }: any) {
  const cancelRef = useRef<any>()
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={setOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirmation of Approval
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You would like to approve {selectedHour?.hoursOfService} hours for {selectedHour?.student.fullName}.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='green' onClick={() => setOnClose(true)} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}