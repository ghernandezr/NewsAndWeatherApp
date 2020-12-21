package com.exercise.city.config;

import com.exercise.city.aop.mongodb.CrudRepositoryAspect;
import com.exercise.city.repository.CustomAuditEventRepository;
import com.exercise.city.repository.NewsRepository;
import com.exercise.city.service.CityService;
import com.exercise.city.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
public class CrudRepositoryAspectConfiguration {

    @Bean
    public CrudRepositoryAspect notificationAspect(UserService userService,
                                                   CustomAuditEventRepository customAuditEventRepository,
                                                   CityService cityService, NewsRepository newsRepository) {
        return new CrudRepositoryAspect(userService, customAuditEventRepository, cityService, newsRepository);

    }
}
