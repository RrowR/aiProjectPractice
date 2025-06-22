// package org.example.springboot_langchain4j.config;
//
// import dev.langchain4j.model.openai.OpenAiChatModel;
// import dev.langchain4j.service.AiServices;
// import dev.langchain4j.service.spring.AiService;
// import org.example.springboot_langchain4j.aiinterface.AiCHatInterface;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
//
// /**
//  * @author: Rrow
//  * @date: 2025/6/21 18:18
//  * Description: 手动注入bean的方式
//  */
// @Configuration
// public class AIChatConfig {
//
//     @Autowired
//     private OpenAiChatModel chatModel;
//
//     @Bean
//     public AiCHatInterface getAiCHatInterface() {
//         AiCHatInterface build = AiServices.builder(AiCHatInterface.class)
//                 .chatModel(chatModel)
//                 .build();
//         return build;
//     }
//
// }
