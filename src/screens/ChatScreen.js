import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

// Chatbot brain logic (simplified for mobile)
const getBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
        return "We offer flexible pricing:\n• Starter: $2,499\n• Professional: $5,999\n• Enterprise: $12,499+\n\nWhich plan interests you?";
    } else if (lowerMsg.includes('service')) {
        return "We specialize in:\n🎨 Creative & Branding\n💻 Tech & Development\n📈 Growth & Marketing\n\nWhat can we help you with?";
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('email')) {
        return "You can reach us at:\n📧 hello@orionvision.com\n📞 +1 (123) 456-7890\n\nOr share your email and we'll contact you!";
    } else if (lowerMsg.includes('portfolio') || lowerMsg.includes('work')) {
        return "We've completed 150+ projects with 98% satisfaction! Check our Portfolio screen to see our latest work.";
    } else if (lowerMsg.includes('@')) {
        const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
        if (emailMatch) {
            return `Perfect! I've noted your email: ${emailMatch[0]}. Our team will reach out within 24 hours. What can we help you build?`;
        }
    } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
        return "Hello! 👋 Welcome to Orion Vision. I'm here to help you build amazing digital experiences. What can I help you with?";
    }

    return "Thanks for reaching out! I can help you with:\n• Pricing information\n• Our services\n• Portfolio examples\n• Contact details\n\nWhat would you like to know?";
};

const ChatScreen = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your digital assistant. How can I help you today?",
            isUser: false,
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollViewRef = useRef();

    const sendMessage = () => {
        if (!inputText.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: inputText,
            isUser: true,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate bot typing and response
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: getBotResponse(inputText),
                isUser: false,
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages, isTyping]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
        >
            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map(message => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageBubble,
                            message.isUser ? styles.userMessage : styles.botMessage,
                        ]}
                    >
                        <Text
                            style={[
                                styles.messageText,
                                message.isUser ? styles.userMessageText : styles.botMessageText,
                            ]}
                        >
                            {message.text}
                        </Text>
                    </View>
                ))}

                {isTyping && (
                    <View style={[styles.messageBubble, styles.botMessage]}>
                        <View style={styles.typingIndicator}>
                            <View style={styles.typingDot} />
                            <View style={styles.typingDot} />
                            <View style={styles.typingDot} />
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message..."
                    placeholderTextColor="#666"
                    multiline
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                >
                    <Text style={styles.sendButtonText}>➤</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
    },
    messageBubble: {
        maxWidth: '85%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#FF3300',
        borderBottomRightRadius: 4,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#222',
        borderTopLeftRadius: 4,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#fff',
    },
    botMessageText: {
        color: '#e5e5e5',
    },
    typingIndicator: {
        flexDirection: 'row',
        gap: 4,
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#888',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#222',
        backgroundColor: '#0A0A0A',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#222',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: '#fff',
        fontSize: 14,
        maxHeight: 100,
    },
    sendButton: {
        marginLeft: 8,
        backgroundColor: '#FF3300',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChatScreen;
