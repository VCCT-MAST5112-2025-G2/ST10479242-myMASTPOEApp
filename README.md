# Developer

Author: Aneeq Harris ST10479242
Year: 2025
Framework: Expo (React Native + TypeScript)
Purpose: Mobile App Scripting Summative Portfolio Of Evidence

# Christoffel's Menu App
A simple and elegant React Native app (built with Expo and TypeScript) that allows a chef to create, view, and manage their restaurant menu dynamically.

---
# Links
## Youtube link
## Github link https://github.com/ST10479242/ST10479242-myMASTPOEApp

---
## Overview

The **Christoffel's Menu App** helps chefs quickly add and organize dishes into different courses such as **Starters**, **Mains**, and **Desserts**.  
All data is stored in memory during the app session — no hardcoded values and no permanent storage needed.

This app was created for a coursework task to demonstrate basic React Native component usage, state management, and user interaction.

---

## Features

### Menu Creation
- Add new dishes with:
  - Dish name  
  - Description  
  - Course selection (Starters, Mains, or Dessert)  
  - Price

### Home Screen
- Displays all dishes added by the chef.
- Shows the **total number of menu items**.
- Each item card includes the name, course, description, and price.

### Technical Highlights
- Built using **Expo + React Native + TypeScript**.
- Fully responsive and styled for a professional, clean layout.
- Uses **Picker** for dropdown course selection.
- **No data is hardcoded** — items are added dynamically.
- SafeAreaView and KeyboardAvoidingView ensure good UX on both Android and iOS.

---

## Usage Instructions

### 1. Clone or Create the Project
If starting fresh, create a new Expo app:
npx create-expo-app chef-menu-app -t expo-template-blank-typescript

npm install @react-native-picker/picker

## Design Notes

Color palette inspired by rustic restaurant tones (warm browns and creams).

Clean spacing and rounded cards for a friendly, aesthetic appearance.

Layout avoids common FlatList and ScrollView nesting issues for smooth scrolling and dropdowns.

## Changelog

1. Expo & Package Version Updates

Updated Expo SDK from 54.0.18 → 54.0.23 for compatibility.

Downgraded react-native-screens from 4.18.0 → ~4.16.0 per Expo requirement.

Cleared Metro cache and dependencies for optimal performance.

2. UI & Layout Enhancements

Redesigned layout for improved spacing and visual hierarchy.

Fixed overlapping issues with buttons and scrollable views.

Adjusted KeyboardAvoidingView behavior to ensure input visibility.

Improved component alignment for a polished look.

3. Code Optimization

Removed unused imports and redundant components.

Refactored state management logic for cleaner structure.

Ensured TypeScript type consistency and error-free compilation.

4. Styling Improvements

Introduced consistent color palette and typography.

Added subtle transitions for buttons and list items.

Improved card styling for better visual grouping of menu items.

5. General Project Maintenance

Ensured all dependencies are aligned with Expo SDK 54.

Verified that the project runs without console warnings.



##Screen Shots
![WhatsApp Image 2025-11-13 at 20 23 31_731ef901](https://github.com/user-attachments/assets/9bd81ddb-15f9-415d-89f3-067e9461f8d3)
![WhatsApp Image 2025-11-13 at 20 23 31_1ddf706a](https://github.com/user-attachments/assets/802d3cd0-e217-4e84-802f-22d04ff83080)
![WhatsApp Image 2025-11-13 at 20 23 31_52b9927c](https://github.com/user-attachments/assets/c19bcb16-0b40-4460-a9e3-b0d7191383bc)
![WhatsApp Image 2025-11-13 at 20 23 30_08b97117](https://github.com/user-attachments/assets/b50e390d-ce28-47da-9909-7b4680e7fe5a)
![WhatsApp Image 2025-11-13 at 20 23 30_cdc86a39](https://github.com/user-attachments/assets/fedeacb2-90c5-4e84-bbaf-86394c911e8c)
![WhatsApp Image 2025-11-13 at 20 23 29_e7205e08](https://github.com/user-attachments/assets/80ce4280-6ddf-4c9f-8dfd-106c1fc695a6)
![WhatsApp Image 2025-11-13 at 20 23 29_a377d577](https://github.com/user-attachments/assets/70b78348-2c18-4f41-827a-5487119c7892)







