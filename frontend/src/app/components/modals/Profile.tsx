"use client"

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import StudentRegistration from '../forms/StudentRegistration';

export default function ProfileModal({ user }: any) {
  let isOpen = !user.profile;
  let onClose = () => console.log('Close')
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Additional Information</ModalHeader>
        <ModalBody>
          <StudentRegistration />
        </ModalBody>

        {/* <ModalFooter>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}