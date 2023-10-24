package com.EcommerceBackend.EcommerceBackend.dao;


import com.EcommerceBackend.EcommerceBackend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.EcommerceBackend.EcommerceBackend.entity.ProductCategory;

@CrossOrigin
public interface ProductRepository extends JpaRepository<Product, Long> {
}