package com.exercise.city.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class AuthorMapperTest {

    private AuthorMapper authorMapper;

    @BeforeEach
    public void setUp() {
        authorMapper = new AuthorMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        String id = "id1";
        assertThat(authorMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(authorMapper.fromId(null)).isNull();
    }
}
