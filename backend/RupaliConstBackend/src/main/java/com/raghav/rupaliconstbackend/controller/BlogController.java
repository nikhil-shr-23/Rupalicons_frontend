package com.raghav.rupaliconstbackend.controller;

import com.raghav.rupaliconstbackend.Repositories.BlogRepository;
import com.raghav.rupaliconstbackend.entity.Blog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = "*") // Allow requests from frontend
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        return blog.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public Blog createBlog(
            @RequestPart("blog") Blog blog,
            @RequestPart(value = "image", required = false) org.springframework.web.multipart.MultipartFile file
    ) throws java.io.IOException {
        if (file != null && !file.isEmpty()) {
            blog.setImage(file.getBytes());
            blog.setImageName(file.getOriginalFilename());
            blog.setImageType(file.getContentType());
        }
        return blogRepository.save(blog);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getBlogImage(@PathVariable Long id) {
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isPresent() && blog.get().getImage() != null) {
            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.valueOf(blog.get().getImageType()))
                    .body(blog.get().getImage());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog blogDetails) {
        Optional<Blog> optionalBlog = blogRepository.findById(id);
        if (optionalBlog.isPresent()) {
            Blog blog = optionalBlog.get();
            blog.setTitle(blogDetails.getTitle());
            blog.setContent(blogDetails.getContent());
            blog.setAuthor(blogDetails.getAuthor());
            blog.setCategory(blogDetails.getCategory());
            // Image update logic would require MultipartFile here too, keeping it simple for now
            return ResponseEntity.ok(blogRepository.save(blog));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
