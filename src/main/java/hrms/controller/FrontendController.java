package hrms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Frontend routing controller.
 * Serves index.html for all non-API routes to enable client-side React Router navigation.
 */
@Controller
public class FrontendController {

    /**
     * Catch-all route that serves index.html for any path that doesn't match an API endpoint.
     * Allows React Router to handle client-side routing.
     */
    @RequestMapping(value = {"/", "/{path:^(?!api|h2-console|actuator|assets|.*\\..*).*}/**"})
    public String index() {
        return "forward:/index.html";
    }
}
