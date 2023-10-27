package com.EcommerceBackend.EcommerceBackend.config;

import com.EcommerceBackend.EcommerceBackend.entity.Product;
import com.EcommerceBackend.EcommerceBackend.entity.ProductCategory;
import org.aspectj.apache.bcel.util.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public  MyDataRestConfig(EntityManager theEntityManager){
        this.entityManager = theEntityManager;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions ={HttpMethod.PUT, HttpMethod.POST,HttpMethod.DELETE};

        // disable http methods for product : PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        // disable http methods for product Category : PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));

        // call internal method to expose the IDE
        exposeIds(config);

    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // expose entity Id

        // get a list of entity classes from entity manager

        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        System.out.println("@@ entities "+entities);

       // create an arreay of entity type
        List<Class> entityClasses = new ArrayList<>();


        // entity types for the entities
        for(EntityType tempEntityType : entities){
            entityClasses.add(tempEntityType.getJavaType());
        }
        System.out.println("@@ entityClasses "+entityClasses);
        // expose the entity ids for the array of entity/domain types
        Class[]  domainTypes = entityClasses.toArray(new Class[0]);
        System.out.println("@@ domainTypes "+domainTypes);
        config.exposeIdsFor(domainTypes);
    }
}
