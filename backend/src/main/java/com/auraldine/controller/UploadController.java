package com.auraldine.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class UploadController {

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> uploadAudio(@RequestParam("file") MultipartFile file) {
        // Placeholder: forward file to ML service here (WebClient or RestTemplate)
        // For now return a sample response so frontend can be developed against it.

        Map<String, Object> resp = Map.of(
                "accent", "Malayalam-English",
                "confidence", 0.87,
                "recommendations", List.of("Appam", "Avial", "Puttu")
        );
        return ResponseEntity.ok(resp);
    }
}
