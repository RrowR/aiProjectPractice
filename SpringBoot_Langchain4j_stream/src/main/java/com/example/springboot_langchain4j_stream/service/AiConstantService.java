package com.example.springboot_langchain4j_stream.service;

import dev.langchain4j.service.spring.AiService;
import dev.langchain4j.service.spring.AiServiceWiringMode;
import reactor.core.publisher.Flux;

/**
 * @author: Rrow
 * @date: 2025/6/22 18:23
 * Description:
 */
@AiService(
        wiringMode = AiServiceWiringMode.EXPLICIT, // 手动配置
        chatModel = "openAiChatModel", // 指定模型
        streamingChatModel = "openAiStreamingChatModel" // 指定流式调用对象
)
public interface AiConstantService {

    Flux<String> getChat(String message);


}
