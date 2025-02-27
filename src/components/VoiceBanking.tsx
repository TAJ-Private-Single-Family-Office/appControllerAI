import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { AIService } from '../services/AIService';

export const VoiceBanking: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const { transcript, startListening, stopListening } = useSpeechRecognition();
    const aiService = new AIService();

    const handleVoiceCommand = async (command: string) => {
        try {
            if (command.includes('balance')) {
                const account = extractAccountFromCommand(command);
                const balance = await bankingService.getAccountDetails(account);
                speak(`Your ${account} balance is ${balance.amount} ${balance.currency}`);
            } else if (command.includes('transfer')) {
                const { amount, fromAccount, toAccount } = extractTransferDetails(command);
                await initiateTransfer(amount, fromAccount, toAccount);
            } else if (command.includes('spending')) {
                const insights = await aiService.generateFinancialInsights();
                speak(insights.join('. '));
            } else {
                speak("I'm sorry, I didn't understand that command.");
            }
        } catch (error) {
            speak("Sorry, there was an error processing your request.");
            console.error(error);
        }
    };

    const speak = (text: string) => {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    };

    const extractAccountFromCommand = (command: string): string => {
        // Add complex command parsing logic
        return 'default-account';
    };

    const extractTransferDetails = (command: string) => {
        // Add transfer detail extraction logic
        return {
            amount: 0,
            fromAccount: '',
            toAccount: ''
        };
    };

    useEffect(() => {
        if (transcript) {
            handleVoiceCommand(transcript);
        }
    }, [transcript]);

    return (
        <div className="voice-banking">
            <button 
                onClick={() => {
                    setIsListening(!isListening);
                    isListening ? stopListening() : startListening();
                }}
            >
                {isListening ? 'Stop Listening' : 'Start Voice Commands'}
            </button>
            {transcript && <p>Heard: {transcript}</p>}
        </div>
    );
}
