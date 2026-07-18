package com.carrental.carservice.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload-dir}")
    private String uploadDir;

    public String store(MultipartFile file) {

        try {
            Path uploadPath = Path.of(uploadDir);
            Files.createDirectories(uploadPath);

            String originalName = file.getOriginalFilename() == null ? "" : file.getOriginalFilename();
            String extension = originalName.contains(".")
                    ? originalName.substring(originalName.lastIndexOf('.'))
                    : "";

            String filename = UUID.randomUUID() + extension;

            Files.copy(file.getInputStream(), uploadPath.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

            return "/images/" + filename;

        } catch (IOException e) {
            throw new UncheckedIOException("Failed to store file", e);
        }
    }
}
