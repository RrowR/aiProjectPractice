package com.langchain4j;

import dev.langchain4j.model.openai.OpenAiChatModel;

/**
 * @author: Rrow
 * @date: 2025/6/21 5:18
 * Description: langchain4j最低jdk需要jdk-17
 */
public class App {
    public static void main(String[] args) {
        // OpenAiChatModel model = OpenAiChatModel.builder()
        //         .baseUrl("https://dashscope.aliyuncs.com/compatible-mode/v1")
        //         .apiKey(System.getenv("API_KEY"))
        //         .modelName("qwen-plus")
        //         .logRequests(true)
        //         .logResponses(true)
        //         .build();
        //
        // String result = model.chat("黄晓明是谁？");
        // System.out.println(result);

        System.getenv().forEach((key, value) -> System.out.println(key + ": " + value));

        System.out.println(System.getenv("API_KEY"));
    }
}
