package edu.slimsider.easybet.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.slimsider.easybet.model.User;
import edu.slimsider.easybet.service.UserService;
import org.hamcrest.collection.IsCollectionWithSize;
import org.hamcrest.core.Is;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(value = UserController.class, secure = false)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void create() throws Exception {
        User user = new User();
        user.setId(1l);
        user.setUsername("test");
        user.setPassword("test");

        BDDMockito.given(userService.createUser(user)).willReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapToJson(user)))
                .andExpect(status().isOk());

    }

    @Test
    public void getAll() throws Exception {
        User user = new User();
        user.setUsername("test");

        List<User> users = Arrays.asList(user);

        BDDMockito.given(userService.getAll()).willReturn(users);

        mockMvc.perform(MockMvcRequestBuilders.get("/admin/get_users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$", IsCollectionWithSize.hasSize(1)))
                .andExpect(jsonPath("$[0].username", Is.is("test")));
    }

    @Test
    public void get() throws Exception {
        User user = new User();
        user.setUsername("test");
        user.setId(1l);

        BDDMockito.given(userService.getUser(user.getId())).willReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.get("/user/get_user_id/"+user.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.username", Is.is("test")))
                .andExpect(jsonPath("$.id", Is.is(1)));
    }

    @Test
    public void getUserByUsername() throws Exception {
        User user = new User();
        user.setUsername("test");

        BDDMockito.given(userService.getUser(user.getUsername())).willReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.get("/user/get_user_name/"+user.getUsername())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.username", Is.is("test")));
    }

    @Test
    public void delete() throws Exception {
        User user = new User();
        user.setId(1l);
        user.setUsername("test");

        BDDMockito.given(userService.deleteUser(user.getId())).willReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.delete("/admin/delete_user/" + user.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.username", Is.is("test")));
    }

    @Test
    public void update() throws Exception {
        User user = new User();
        user.setUsername("test");
        user.setPassword("test");
        user.setId(1l);

        BDDMockito.given(userService.updateUser(user)).willReturn(user);

        String userJson = mapToJson(user);
        mockMvc.perform(put("/user/update_user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isCreated());
    }

    private String mapToJson(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}