        <footer>
            <nav>
                <ul class="footer_nav">
                    <li class="footer_link">
                        <a href="<?= home_url(); ?>" class="nav-header_logo-link header_link">
                            <img class="header_logo-img" src="<?= get_theme_file_uri(); ?>/assets/img/dice_icon.ico" alt="">
                            <!-- <h3 class="header_logo-title">CdC</h3> -->
                        </a>
                    </li>
                    <li>
                        <a href="<?= home_url(); ?>/game" class="footer_link">Jouer
                            <span><i class="fas fa-dice dice_icon"></i></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
        </body>
        <?php wp_footer(); ?>

        </html>