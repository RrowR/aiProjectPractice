package com.example.springboot_langchain4j_stream.constroller;

import com.example.springboot_langchain4j_stream.service.AiConstantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

/**
 * @author: Rrow
 * @date: 2025/6/21 6:38
 * Description:
 */
@RestController
@CrossOrigin
public class ChatController {

    @Autowired
    private AiConstantService aiConstantService;

    @RequestMapping(value = "/chat",produces = "text/html;charset=utf-8")
    public Flux<String> chat3(String message){
        Flux<String> chat = aiConstantService.getChat(message);
        return chat;
    }

}
