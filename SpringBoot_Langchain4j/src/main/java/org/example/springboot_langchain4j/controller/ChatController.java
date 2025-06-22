package org.example.springboot_langchain4j.controller;

import dev.langchain4j.model.openai.OpenAiChatModel;
import org.example.springboot_langchain4j.aiinterface.AiCHatInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: Rrow
 * @date: 2025/6/21 6:38
 * Description:
 */
@RestController
public class ChatController {

    @Autowired
    private OpenAiChatModel chatModel;

    @Autowired
    private AiCHatInterface aiCHatInterface;

    @RequestMapping("/chat")
    public String chat(String message){
        String chat = chatModel.chat(message);
        return chat;
    }

    @RequestMapping("/chat2")
    public String chat2(String message){
        String chat = aiCHatInterface.getChat(message);
        return chat;
    }

    @RequestMapping("/chat3")
    public String chat3(String message){
        String chat = aiCHatInterface.getChat(message);
        return chat;
    }

}
