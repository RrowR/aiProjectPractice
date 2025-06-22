package org.example.springboot_langchain4j.aiinterface;

import dev.langchain4j.service.spring.AiService;
import dev.langchain4j.service.spring.AiServiceWiringMode;

/**
 * @author: Rrow
 * @date: 2025/6/21 18:18
 * Description:
 */
// 声明式ai
@AiService(
        wiringMode = AiServiceWiringMode.EXPLICIT,   // 手动装配
        chatModel = "openAiChatModel"       // 指定模型
)
// @AiService      // 也可以什么都不指定   声明式
public interface AiCHatInterface {

    String getChat(String prompt);

}
