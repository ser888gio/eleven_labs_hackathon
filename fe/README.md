# Dating Bio Architect

An AI-powered voice conversation application that helps users create compelling dating profiles through an interactive interview with an AI dating consultant named "Hitch."

## Tech Stack

- **React** with TypeScript
- **Tailwind CSS** for styling
- **ElevenLabs Voice AI** for conversational interface
- **Lucide React** for icons

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure ElevenLabs Agent

Before running the application, you need to set up your ElevenLabs conversational agent:

1. Go to [ElevenLabs](https://elevenlabs.io/) and create an account
2. Navigate to the Conversational AI section
3. Create a new agent with a dating consultant personality (name it "Hitch")
4. Configure the agent with a client tool named `displayBio`:
   - **Tool name:** `displayBio`
   - **Description:** "Display the generated dating bio to the user"
   - **Parameters:**
     - `bio_text` (string, required): "The complete dating bio text to display"
5. Copy your Agent ID
6. Open `src/App.tsx` and replace `'YOUR_AGENT_ID_HERE'` with your actual agent ID on line 10

### 3. Run the Application

```bash
npm run dev
```

The application will start on `http://localhost:5173`

## Features

- **Voice Interview:** Click "Start Interview" to begin a voice conversation with the AI consultant
- **Real-time Feedback:** Visual indicators show when the AI is speaking or listening
- **Bio Generation:** The AI generates a compelling dating bio based on the conversation
- **Copy Functionality:** One-click copy to clipboard for the generated bio
- **Responsive Design:** Works seamlessly on mobile and desktop devices
- **Beautiful UI:** Modern purple-to-pink gradient theme with smooth animations

## How It Works

1. User clicks "Start Interview" button to begin voice conversation
2. The ElevenLabs AI agent (Hitch) conducts an interview about the user's interests, personality, and dating preferences
3. Based on the conversation, the AI generates a compelling dating bio
4. The AI calls the `displayBio` client tool to render the bio on screen
5. User can copy the bio to their clipboard and use it on dating platforms

## Component Structure

- **App.tsx:** Main component with voice integration and UI logic
- **State Management:** Uses React hooks for bio data and UI state
- **ElevenLabs Integration:** `useConversation` hook handles voice AI connection
- **Client Tools:** `displayBio` tool receives generated bio from AI and displays it

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Accessibility Features

- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for button interactions
- Clear visual feedback for all states

## Customization

You can customize the application by:
- Modifying the color scheme in Tailwind classes
- Adjusting the agent personality in ElevenLabs dashboard
- Changing animation timings in `src/index.css`
- Updating the hero text and branding

## Requirements

- Node.js 18+
- Modern browser with Web Audio API support
- Microphone access for voice interaction
- ElevenLabs account and API access
