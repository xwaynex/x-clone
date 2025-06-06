"use client";

import Modal from "@/components/Modal";
import { useAtom } from "jotai";
import { modalState } from "@/atoms/modelAtoms";

export default function ModalWrapper() {
  const [isOpen] = useAtom(modalState);
  return isOpen ? <Modal /> : null;
}
