import React, { useState } from 'react';
import { useTheme } from '../../ThemeContext'; // Importing theme
import styles from '../styles/FinanceResources.module.css';
import { FaArrowRight } from 'react-icons/fa'; // Importing React Icons for buttons

const resources = [
  {
    title: "Budgeting Basics",
    description: "Learn how to effectively budget your finances as a student with step-by-step guides.",
    media: "https://fastercapital.com/i/Financial-Management--How-to-Organize-and-Optimize-Your-Financial-Resources-and-Processes--Understanding-the-Importance-of-Financial-Management.webp", // Example media URL (video)
    mediaType: "image",
    link: "#"
  },
  {
    title: "Saving Strategies",
    description: "Discover practical saving tips to reduce expenses and build long-term savings.",
    media: "https://jedfoundation.org/wp-content/uploads/2023/08/pexels-anete-lusina-6331258.jpg", // Example media URL (image)
    mediaType: "image",
    link: "#"
  },
  {
    title: "Investment 101",
    description: "An introduction to investing for students looking to grow their savings.",
    media: "https://wallacefoundation.org/sites/default/files/2023-09/sfm-home-page-graphic.png",
    mediaType: "image",
    link: "#"
  },
  {
    title: "Budgeting Basics",
    description: "Learn how to effectively budget your finances as a student with step-by-step guides.",
    media: "https://fastercapital.com/i/Financial-Management--How-to-Organize-and-Optimize-Your-Financial-Resources-and-Processes--Understanding-the-Importance-of-Financial-Management.webp", // Example media URL (video)
    mediaType: "image",
    link: "#"
  },
  {
    title: "Saving Strategies",
    description: "Discover practical saving tips to reduce expenses and build long-term savings.",
    media: "https://jedfoundation.org/wp-content/uploads/2023/08/pexels-anete-lusina-6331258.jpg", // Example media URL (image)
    mediaType: "image",
    link: "#"
  },
  {
    title: "Investment 101",
    description: "An introduction to investing for students looking to grow their savings.",
    media: "https://wallacefoundation.org/sites/default/files/2023-09/sfm-home-page-graphic.png",
    mediaType: "image",
    link: "#"
  },
  {
    title: "Investment 101",
    description: "An introduction to investing for students looking to grow their savings.",
    media: "https://wallacefoundation.org/sites/default/files/2023-09/sfm-home-page-graphic.png",
    mediaType: "image",
    link: "#"
  },
  {
    title: "Investment 101",
    description: "An introduction to investing for students looking to grow their savings.",
    media: "https://wallacefoundation.org/sites/default/files/2023-09/sfm-home-page-graphic.png",
    mediaType: "image",
    link: "#"
  },
  {
    title: "Investment 101",
    description: "An introduction to investing for students looking to grow their savings.",
    media: "https://wallacefoundation.org/sites/default/files/2023-09/sfm-home-page-graphic.png",
    mediaType: "image",
    link: "#"
  },
  {
    title: "Investment 101",
    description: "An introduction to investing for students looking to grow their savings.",
    media: "https://wallacefoundation.org/sites/default/files/2023-09/sfm-home-page-graphic.png",
    mediaType: "image",
    link: "#"
  },
  // Add more resources...
];

const FinanceResources = () => {
  const { isDarkTheme } = useTheme(); // Access theme
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={`${styles.container} ${isDarkTheme ? styles.dark : styles.light}`}>
      {resources.map((resource, index) => (
        <div 
          key={index} 
          className={`${styles.resourceSection} ${index % 2 === 0 ? styles.leftMedia : styles.rightMedia}`}
        >
          <div className={styles.resourceMedia}>
            {resource.mediaType === "video" ? (
              <video src={resource.media} controls className={styles.mediaContent} />
            ) : (
              <img src={resource.media} alt={resource.title} className={styles.mediaContent} />
            )}
          </div>
          <div className={styles.resourceContent}>
            <h2 className={styles.sectionTitle}>{resource.title}</h2>
            <p className={styles.description}>{resource.description}</p>
            <a href={resource.link} className={styles.learnMore}>
              Learn More <FaArrowRight className={styles.icon} />
            </a>
          </div>
        </div>
      ))}

      {showMore && (
        <div className={styles.additionalResources}>
          <h2>More Finance Resources</h2>
          {/* Add additional resources or links */}
        </div>
      )}

      <button className={styles.moreButton} onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More Resources"}
      </button>
    </div>
  );
};

export default FinanceResources;
