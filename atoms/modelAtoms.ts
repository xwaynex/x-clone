"use client"

import { atom } from "jotai";

export const modalState = atom<boolean>(false);

export const postIdState = atom<string>("")