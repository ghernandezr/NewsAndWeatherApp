package com.exercise.city.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.exercise.city.web.rest.TestUtil;

public class NewsDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(NewsDTO.class);
        NewsDTO newsDTO1 = new NewsDTO();
        newsDTO1.setId("id1");
        NewsDTO newsDTO2 = new NewsDTO();
        assertThat(newsDTO1).isNotEqualTo(newsDTO2);
        newsDTO2.setId(newsDTO1.getId());
        assertThat(newsDTO1).isEqualTo(newsDTO2);
        newsDTO2.setId("id2");
        assertThat(newsDTO1).isNotEqualTo(newsDTO2);
        newsDTO1.setId(null);
        assertThat(newsDTO1).isNotEqualTo(newsDTO2);
    }
}
