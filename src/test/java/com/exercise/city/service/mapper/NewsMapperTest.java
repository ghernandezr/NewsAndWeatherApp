package com.exercise.city.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class NewsMapperTest {

    private NewsMapper newsMapper;

    @BeforeEach
    public void setUp() {
        newsMapper = new NewsMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        String id = "id1";
        assertThat(newsMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(newsMapper.fromId(null)).isNull();
    }
}
