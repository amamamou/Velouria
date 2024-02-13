-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2024 at 09:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myarticle`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'admin', 'admin@velouria.com', 'karam', '2024-02-08 19:33:43');

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT 0,
  `isLiked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `created_at`, `image`, `author`, `category_id`, `time`, `isLiked`) VALUES
(1, 'Sample Article', 'This is a sample article content.', '2024-01-19 11:38:27', 'uploads/horse1.jfif', 'mm', 2, 1, NULL),
(3, 'Exploring the Timeless Allure of the Porsche 911: An Icon in Automotive History', 'The Porsche 911, a name synonymous with automotive excellence, has captivated the hearts of car enthusiasts around the world for decades. Since its debut in the 1960s, the 911 has evolved, yet it has unfailingly adhered to its roots, consistently setting the benchmark for sports car design and performance.\r\n\r\nThe Genesis of a Legend\r\nThe story of the Porsche 911 begins in 1963, when it was unveiled at the Frankfurt Motor Show. Designed by Ferdinand \"Butzi\" Porsche, the grandson of the company\'s founder, the 911 was a more powerful, larger, and more comfortable replacement for the Porsche 356, the company\'s first production automobile. The original 911 featured an air-cooled rear-engine layout, a feature that became a defining characteristic of the model.\r\n\r\nDesign and Performance: A Blend of Elegance and Power\r\nThe Porsche 911\'s design is instantly recognizable, with its elegant, flowing lines and the distinctive round headlights that have become an iconic feature. Over the years, while the 911\'s design has seen continuous refinement and modernization, it has always remained true to its original, timeless form.\r\n\r\nUnder the hood, the Porsche 911 has always been about unbridled power and agility. The early models were powered by a flat-six engine, delivering a thrilling driving experience. The car\'s low center of gravity, rear-engine layout, and precise handling have made it a favorite on both the road and the racetrack. Modern 911s continue this legacy, incorporating advanced technology to enhance performance while still delivering the raw excitement that is expected of a Porsche.\r\n\r\nRacing Heritage and Cultural Impact\r\nThe Porsche 911 is not just a car; it\'s a cultural icon. Its success on the racetrack has helped to cement its status as a legend. The 911 has seen countless victories in various forms of motorsport, including the grueling 24 Hours of Le Mans and the rally stages. This racing pedigree has not only proven the 911\'s capabilities but also its reliability and durability under the most extreme conditions.\r\n\r\nBeyond the track, the 911 has been a symbol of style and aspiration. It has appeared in numerous films, TV shows, and other media, often as a representation of success and performance. The car\'s appeal transcends automotive enthusiasts, drawing admirers from all walks of life.\r\n\r\nThe 911 Today: Embracing the Future\r\nToday\'s Porsche 911 models continue to push the boundaries. While remaining faithful to its heritage, Porsche has embraced technological advancements. The latest models offer a blend of classic Porsche DNA with modern features like advanced infotainment systems, driver assistance technologies, and more efficient, yet powerful, engines.\r\n\r\nThe 911\'s adaptability is also seen in its diverse range of models, from the base Carrera to the track-focused GT3, and the turbocharged variants. Each model offers a different interpretation of the 911 philosophy, but all deliver the exhilarating performance and sublime handling that the brand is known for.\r\n\r\nConclusion: More Than Just a Car\r\nThe Porsche 911 is more than just a car; it is a testament to the enduring appeal of a well-conceived design and engineering philosophy. Its continuous evolution while maintaining its core identity is a rare story of success in the automotive world. As it moves into the future, whether embracing electrification or new technological innovations, the Porsche 911 is sure to remain a symbol of automotive passion and excellence, continuing to capture the imaginations of future generations of drivers and enthusiasts.', '2024-01-19 12:45:14', 'uploads/porshe9111.jfif', 'mmmmm', 5, 6, NULL),
(4, 'The Brave Hearts of Palestinian Children', 'Palestinian children living in conflict-affected areas demonstrate remarkable bravery and resilience in the face of adversity. Despite enduring unimaginable challenges, these children continue to show courage and strength beyond their years.\n\nMany Palestinian children grow up amidst violence, restrictions on movement, and a lack of access to basic necessities like clean water, food, and healthcare. They face daily hardships, including the threat of arrest, injury, or even death. Despite these challenges, they persevere with unwavering determination.\n\nPalestinian children often find themselves in situations where their rights are violated, their homes demolished, and their families displaced. Yet, they refuse to lose hope and continue to dream of a better future. Their resilience is a testament to the human spirit\'s ability to endure and overcome even the most difficult circumstances.\n\nThese children exhibit bravery in various aspects of their lives. They go to school, play with friends, and pursue their passions despite the constant threat of violence and instability. Their courage serves as an inspiration to people around the world, reminding us of the importance of resilience, hope, and perseverance.\n\nAs we acknowledge the bravery of Palestinian children, we must also recognize the urgent need to protect and support them. Every child deserves to grow up in a safe and nurturing environment, free from fear and oppression. It is our collective responsibility to ensure that Palestinian children have the opportunity to thrive and realize their full potential.\n\n', '2024-02-07 02:23:57', 'uploads/f.jfif', 'Maram Amamou', 1, 4, NULL),
(6, 'The Allure of Figs: Nature\'s Sweet Gemm', 'In the realm of fruits, the fig holds a distinguished status with its unique flavor and texture, a testament to nature\'s artistry. This luscious fruit, with its velvety exterior and honeyed interior, is not just a culinary delight but also a symbol of abundance and fertility in various cultures.\r\n\r\n**The Origins and Journey**\r\n\r\nFigs, born from the Ficus tree, a member of the Mulberry family, trace their origins back to ancient times. They are believed to have first been cultivated in the fertile crescent, the cradle of civilization. Throughout history, they have graced the tables of emperors and commoners alike, revered not only for their taste but also for their nutritional value.\r\n\r\n**A Symphony of Flavors and Textures**\r\n\r\nBiting into a fig is an experience unlike any other. The soft, chewy texture of the skin gives way to a burst of sweet, jammy flesh interspersed with tiny, crunchy seeds. Figs can vary in color - from deep purples and reds to green and golden hues - each type offering a slightly different flavor profile.\r\n\r\n**A Nutritional Powerhouse**\r\n\r\nBeyond their enticing flavor, figs are a treasure trove of health benefits. They are rich in fiber, aiding in digestive health, and contain an array of essential minerals such as magnesium, calcium, and iron. Figs are also high in antioxidants and have a lower glucose level compared to other fruits, making them a healthier sweet alternative.\r\n\r\n**Culinary Versatility**\r\n\r\nFigs are a chef\'s delight, known for their versatility in both sweet and savory dishes. They can elevate a simple salad, pair exquisitely with cheeses, or be transformed into delectable jams and desserts. Fresh or dried, they add a burst of sweetness and texture to any dish.\r\n\r\n**Sustainability and Cultivation**\r\n\r\nFig trees are resilient and can thrive in diverse climates, making them a valuable crop for sustainable farming. They require less water compared to many other fruits and are often grown organically, adding to their appeal.\r\n\r\n**Conclusion**\r\n\r\nThe fig, with its rich history, delightful flavors, and numerous health benefits, remains a cherished fruit across the globe. It stands as a reminder of nature\'s generosity, offering a taste that is as nourishing as it is indulgent.\r\n\r\n', '2024-01-19 13:13:10', 'uploads/figs2.jfif', 'mo', 6, 10, NULL),
(7, ' The Timeless Elegance of Rolex: A Symbol in the Fashion World', 'The Timeless Elegance of Rolex: A Symbol in the Fashion World\r\n\r\nIn the world of luxury timepieces, few brands hold the prestige and recognition of Rolex. Synonymous with excellence, durability, and timeless elegance, Rolex has established itself as more than just a watch brand; it\'s a symbol of status and an integral part of the fashion world.\r\n\r\n## The History of Rolex: Pioneering Innovation\r\n\r\nFounded in 1905 by Hans Wilsdorf, Rolex set out with a vision to create reliable wristwatches, a relatively novel concept at the time. The brand quickly became a pioneer, introducing the first waterproof wristwatch – the Oyster – in 1926, and the first self-winding mechanism in 1931.\r\n\r\n## Rolex in Fashion: More Than Just Timekeeping\r\n\r\nWhile the functionality of Rolex watches is unparalleled, their impact on fashion is equally significant. Rolex watches are not merely timekeeping instruments; they are fashion statements. They signify a blend of classic style and sophistication that complements any wardrobe, from formal attire to casual wear.\r\n\r\n### The Rolex Design Ethos\r\n\r\nRolex\'s design ethos is one of understated elegance. The brand favors simple, clean lines that exude class and durability. This design philosophy ensures that a Rolex watch never goes out of style, transcending short-lived fashion trends.\r\n\r\n### Rolex and Celebrity Influence\r\n\r\nThe influence of Rolex in the fashion world is partly attributed to its popularity among celebrities and style icons. From Hollywood stars to sports legends, Rolex watches have adorned the wrists of influential figures, further cementing their status as a luxury symbol.\r\n\r\n## The Rolex Models: Icons of Style\r\n\r\n### The Submariner: A Diver\'s Dream\r\n\r\nOriginally designed for divers, the Rolex Submariner has become a staple in men\'s fashion. Its robust and functional design, paired with an air of adventure, makes it a favorite for both its utility and aesthetic appeal.\r\n\r\n### The Datejust: Classic Sophistication\r\n\r\nThe Rolex Datejust is the epitome of classic watch design. First introduced in 1945, it features a simple, elegant, and uncluttered dial, making it suitable for both formal and casual settings. Its versatility is a key to its enduring popularity in the fashion world.\r\n\r\n### The Daytona: A Sporty Elegance\r\n\r\nThe Rolex Daytona, designed for professional racing drivers, combines functionality with style. It\'s sporty yet elegant, perfect for those who appreciate a watch that stands out and speaks to a life of excitement and luxury.\r\n\r\n## Sustainability and Ethical Fashion\r\n\r\nIn recent years, Rolex has taken significant steps towards sustainability and ethical production practices. This commitment not only reinforces its status as a leader in the watchmaking industry but also resonates with a growing consumer base that values sustainability in fashion.\r\n\r\n## Conclusion: A Timeless Investment\r\n\r\nA Rolex is more than a watch; it\'s an investment in style, quality, and craftsmanship. It transcends the concept of fashion as something fleeting, instead embodying a timeless elegance that can be passed down through generations. In the dynamic world of fashion, a Rolex isn\'t just about keeping time; it\'s about enduring style and a legacy of excellence.', '2024-01-24 23:28:53', 'uploads/1706138933728-e01a03a572e975584c7538f5e0a301a1.jpg', 'Maram Amamou', 3, 12, NULL),
(50, 'Honey: Nature\'s Sweet Secret', 'Honey, a golden elixir, has been relished and revered throughout human history. This natural sweetener, more than just a sugar substitute, is a culinary marvel and a testament to the wonders of nature.\n\n**The Making of Honey: A Bee\'s Life Work**\n\nHoney\'s journey begins in the heart of blooming flowers, where bees, nature\'s skilled artisans, collect nectar. Back in the hive, through an astonishing process of regurgitation, evaporation, and enzyme activity, this nectar transforms into honey. It\'s a fascinating alchemy, orchestrated by the hive\'s tireless inhabitants.\n\n**Beyond Sweetness: A Bounty of Benefits**\n\nHoney isn\'t just about sweetness; it\'s a treasure trove of benefits. Its antimicrobial properties make it a natural healer, used in wound care and as a remedy for sore throats. Rich in antioxidants, it\'s a boost for wellness and a friend to the immune system. And for those seeking natural remedies, honey is a time-honored ingredient in many traditional medicines.\n\n**A Taste of the Wild: Honey\'s Flavor Palette**\n\nThe taste of honey is a whisper of the landscape from which it came. Depending on the flowers visited by the bees, honey can range from light and floral to dark and robust. Each variety tells a story of region and season, offering an edible insight into its origins.\n\n**Honey in the Kitchen: Culinary Liquid Gold**\n\nIn the culinary world, honey is a versatile star. It balances flavors in savory dishes and adds complexity to sweet creations. From glazing hams to drizzling over yogurt or blending into salad dressings, honey\'s uses are as varied as its flavors.\n\n**The Bitter-Sweet Truth: A Call for Protection**\n\nAs we relish this natural wonder, it\'s vital to remember that honey\'s existence hinges on the health of bees. With bees facing threats from pesticides, habitat loss, and climate change, protecting them is not just about preserving honey, but about safeguarding our ecosystems.\n\n**Conclusion: More than Just Sweetness**\n\nHoney is a testament to nature\'s ingenuity and bees\' tireless work. It\'s a sweet reminder of our connection to the natural world and a call to protect the delicate balance that sustains it. So, the next time you savor honey, remember it\'s more than just a sweetener - it\'s a drop of nature\'s magic. ✨', '2024-01-20 14:38:16', 'uploads/1705761496355-arwin-neil-baichoo-yQzrDgU-KAI-unsplash.jpg', 'Julian Blackwood\n', 6, 8, NULL),
(68, 'The Art of Eating Healthy: Nourish Your Body, Nourish Your Soul', 'In a world filled with tempting fast food options and sugary treats, the concept of eating healthy often takes a backseat. However, adopting a nutritious diet isn\'t just about counting calories or following restrictive meal plans. It\'s about nourishing your body with wholesome foods that fuel your energy and vitality while delighting your senses.\r\n\r\n**Embrace the Rainbow 🌈**\r\n\r\nWhen it comes to eating healthy, diversity is key. Instead of focusing on cutting out certain foods, shift your attention to incorporating a variety of colorful fruits and vegetables into your meals. Each vibrant hue signifies a unique array of vitamins, minerals, and antioxidants that promote overall well-being. From the deep green of spinach to the fiery red of bell peppers, let nature\'s palette inspire your culinary creations.\r\n\r\n**Mindful Eating 🍽️**\r\n\r\nIn our fast-paced lives, it\'s easy to rush through meals without truly savoring the flavors or appreciating the nourishment they provide. Mindful eating invites us to slow down, engage our senses, and cultivate a deeper connection with our food. Take the time to admire the vibrant colors, inhale the enticing aromas, and relish each mouthful. By tuning into your body\'s hunger and fullness cues, you can enjoy a more gratifying and satisfying eating experience.\r\n\r\n**Plant-Powered Bliss 🌱**\r\n\r\nPlant-based eating isn\'t just a trend; it\'s a lifestyle that celebrates the abundance of delicious and nutritious options available in the plant kingdom. Whether you\'re enjoying a hearty lentil stew, a refreshing quinoa salad, or a creamy avocado toast, plant-based meals offer endless possibilities for culinary creativity. Not only are they packed with essential nutrients, but they also support environmental sustainability and animal welfare.\r\n\r\n**Guilt-Free Indulgence 🍫**\r\n\r\nHealthy eating doesn\'t mean depriving yourself of the occasional indulgence. Treat yourself to wholesome versions of your favorite comfort foods, such as homemade banana oat cookies, dark chocolate-dipped strawberries, or a creamy avocado chocolate mousse. By choosing nutrient-dense ingredients and savoring these treats mindfully, you can satisfy your cravings without compromising your health goals.\r\n\r\n**Cultivate Culinary Creativity 🎨**\r\n\r\nEating healthy is an art form that invites you to unleash your culinary creativity and experiment with new flavors, textures, and ingredients. Whether you\'re trying your hand at homemade sushi rolls, crafting a colorful buddha bowl, or blending a nutrient-packed smoothie bowl, let your imagination run wild in the kitchen. Embrace the joy of cooking as a form of self-expression and self-care.\r\n\r\n**Conclusion: Nourish Your Body, Nourish Your Soul 🌟**\r\n\r\nEating healthy is more than just a means to an end; it\'s a journey of self-discovery, self-love, and self-care. By embracing the art of eating healthy, you can nourish your body, uplift your spirit, and cultivate a deeper appreciation for the incredible gift of food. So, savor each bite, celebrate each flavor, and let the nourishing power of wholesome eating enrich every aspect of your life.', '2024-02-07 01:57:23', 'uploads/healthy.jfif', 'Me', 6, 2, NULL),
(73, 'The Beauty of Nature', 'Nature is breathtakingly beautiful, with its lush green forests, majestic mountains, and serene lakes. Every sunrise and sunset paints the sky with vibrant colors, reminding us of the wonders of our planet.', '2024-02-09 22:33:09', 'uploads/jaime.jfif', 'Anonymous', 1, 5, 0),
(74, 'Dior Perfumes: Elegance in Every Scent', 'Dior perfumes for women exude sophistication and charm. Each fragrance captures the essence of femininity, from the floral notes of J\'adore to the timeless allure of Miss Dior. With every spritz, Dior perfumes adorn you with a touch of luxury, leaving a lasting impression wherever you go.', '2024-02-09 22:53:17', 'uploads/dior.jfif', 'Anonymous', 3, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`) VALUES
(1, 'Global Insights', 'https://i.pinimg.com/564x/b2/a7/8b/b2a78b7520577fc3664213e22bffd2c3.jpg'),
(2, 'Wildlife Wonders', 'https://i.pinimg.com/564x/0a/b8/eb/0ab8eb7f966537d6218b7a30f9540a16.jpg'),
(3, 'Fashion Forward', 'https://i.pinimg.com/564x/c6/e1/bd/c6e1bdfb65138df82381fbb7cf09453c.jpg'),
(4, 'Champions League', 'https://i.pinimg.com/564x/a3/ee/c2/a3eec2511185f5a514d688c75121ea27.jpg'),
(5, 'Auto World', 'https://i.pinimg.com/736x/a1/a8/05/a1a805061e892886b9ed05fc58c3917b.jpg'),
(6, 'Culinary Delights', 'https://i.pinimg.com/564x/1e/8b/44/1e8b44e3d0dcb0038c719749c10750a1.jpg'),
(11, 'Destinations', 'https://i.pinimg.com/564x/e0/13/16/e013163d0726678d3c2b57beb60061ae.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `article_id`, `user_id`, `comment_text`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'A short comment about Rolex for user ID 1 and article ID 1', '2024-02-06 23:38:23', '2024-02-06 23:38:23'),
(5, 6, 1, 'hi', '2024-02-08 03:20:12', '2024-02-08 03:20:12'),
(6, 6, 1, 'test', '2024-02-08 03:20:28', '2024-02-08 03:20:28'),
(7, 6, 1, 'alo', '2024-02-08 03:24:32', '2024-02-08 03:24:32'),
(10, 3, 1, 'my dream car !', '2024-02-08 05:13:54', '2024-02-08 05:13:54');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `user_id`, `article_id`, `created_at`) VALUES
(30, 1, 1, '2024-02-06 21:43:35'),
(37, 1, 3, '2024-02-06 22:24:57'),
(62, 12, 1, '2024-02-08 01:07:35'),
(63, 12, 7, '2024-02-08 01:07:48'),
(64, 12, 3, '2024-02-08 01:45:57'),
(65, 1, 4, '2024-02-08 02:37:14'),
(66, 1, 68, '2024-02-08 02:54:54'),
(67, 1, 6, '2024-02-08 03:33:35'),
(69, 1, 50, '2024-02-08 18:23:02'),
(70, 1, 7, '2024-02-10 01:51:51'),
(71, 5, 7, '2024-02-10 02:04:10'),
(72, 5, 68, '2024-02-10 02:04:44'),
(73, 17, 3, '2024-02-10 03:02:19'),
(74, 5, 6, '2024-02-13 01:00:24'),
(75, 5, 4, '2024-02-13 01:00:29');

--
-- Triggers `likes`
--
DELIMITER $$
CREATE TRIGGER `after_insert_like` AFTER INSERT ON `likes` FOR EACH ROW BEGIN
  UPDATE articles
  SET isLiked = isLiked + 1
  WHERE id = NEW.article_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `recipientType` varchar(10) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `title`, `message`, `type`, `recipientType`, `created_at`, `updated_at`) VALUES
(1, 'New Like Notification', 'User 5 has liked article 68.', 'like', 'admin', '2024-02-10 02:04:44', '2024-02-13 19:56:56'),
(2, 'New Comment Added', 'A new comment has been added to article with ID 3.', 'comment', 'admin', '2024-02-10 02:12:33', '2024-02-13 19:56:59'),
(3, 'New User Registered', 'A new user with username inkol and email 123@gmail.com has registered.', 'user_registration', 'admin', '2024-02-10 03:02:05', '2024-02-13 19:57:04'),
(5, 'New Like Notification', 'User 5 has liked article 6.', 'like', 'admin', '2024-02-13 01:00:24', '2024-02-13 19:57:09'),
(6, 'New Like Notification', 'User 5 has liked article 4.', 'like', 'admin', '2024-02-13 01:00:29', '2024-02-13 19:57:13'),
(7, 'Sample Article', 'A new article titled \"Sample Article\" has been published.', 'article_published', 'user', '2024-02-13 20:06:41', '2024-02-13 20:06:41'),
(8, 'Exploring the Timeless Allure of the Porsche 911', 'A new article titled \"Exploring the Timeless Allure of the Porsche 911\" has been published.', 'article_published', 'user', '2024-02-13 20:06:41', '2024-02-13 20:06:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_pic` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `like_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `created_at`, `updated_at`, `profile_pic`, `first_name`, `last_name`, `like_id`) VALUES
(1, 'karam', 'karam@gmail.com', '$2b$10$lBN.RWEM55DEplclYDel3.bnq8Gm5oHLqVGhz1aVsK6seHPaJxJ/K', '2024-01-22 11:57:07', '2024-02-13 00:54:04', 'joujou.jfif', 'Karam', 'Amamou', 0),
(5, 'maram', 'maramamamou0@gmail.com', '$2b$10$E5btEcGqAm/3KjLwjoqTa.vEpY2h62ig/lWGEt6VRbkvZ6jL2cRYy', '2024-01-24 11:19:29', '2024-02-13 00:54:09', 'joujou.jfif', 'Maram', 'Amamou', 0),
(12, 'majd', 'yy@gmail.com', '$2b$10$xoAiOF5X1tNAA6DJsrGrWeQHpT/EdhXDo9y3Y0BtpGEEadgIBiDCe', '2024-01-31 10:22:49', '2024-02-09 04:33:16', 'majd.jfif', 'Majd', 'Amamou', 0),
(13, 'ma', 'm@gmail.com', '$2b$10$rcQi.Qk4hwJjLn651pJNOOGjblG1ohjFC9D.4N42D8xHQTgwrV41u', '2024-02-10 02:50:27', '2024-02-10 02:50:27', NULL, 'Kolok', 'ldz', 0),
(14, 'la', 'lo@gmail.com', '$2b$10$6fzULoT2uISzc8dmVDxYcuFZFAbDKVvcZqRqspZR9We4m5yQr.0Pm', '2024-02-10 02:51:00', '2024-02-10 02:51:00', NULL, 'lola', 'lolala', 0),
(15, 'lola', 'lola@gmail.com', '$2b$10$joZdOvyvMGj1kCj0zNgZgu9DNffGBWwgdEQWL3yrtdHgBMo0C/BxO', '2024-02-10 02:55:17', '2024-02-10 02:55:17', NULL, 'koaka', 'koakaa', 0),
(16, 'koal', 'loala@gmail.com', '$2b$10$3.qsASh2zt02VFb8nxVzweFkMovJ8m2qp5szsX0E.kbEL4KbtjT/e', '2024-02-10 02:56:59', '2024-02-10 02:56:59', NULL, 'dezd', 'czef', 0),
(17, 'inkol', '123@gmail.com', '$2b$10$1NQ4VzYsHSsOYFcnP6UzgOMXICUEO6IJW09nmEe7x7upoH1yxYUu2', '2024-02-10 03:02:05', '2024-02-10 03:02:05', NULL, 'dezd', 'czef', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `likes_ibfk_2` (`article_id`),
  ADD KEY `likes_ibfk_1` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
