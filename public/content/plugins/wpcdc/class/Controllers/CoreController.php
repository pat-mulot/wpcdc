<?php

namespace wpcdc\Controllers;

class CoreController
{
    /**
     * @var AltoRouter
     */
    protected $router;
    // protected $commonVars;;
    public function __construct()
    {
        global $router;
        $this->router = $router;
    }
    protected function show($viewName, $viewVars = [])
    {
        // var_dump($viewName);
        // var_dump($viewVars);
        echo get_template_part(
            $viewName,
            null,
            $viewVars);
    }
}
