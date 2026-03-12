package org;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
        "org.authentication",
        "org.config",
        "org.controller",
        "org.exception",
        "org.model",
        "org.repository",
        "org.service"
})public class Main {
  public static void main(String[] args) {
    SpringApplication.run(Main.class, args);
  }
}