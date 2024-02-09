import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  articlePopularityData: any[] = [];
  articlePopularityChart: Chart | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchArticlePopularity();
  }

  fetchArticlePopularity(): void {
    this.adminService.getArticlePopularity().subscribe(
      (data) => {
        this.articlePopularityData = data;
        console.log('Article popularity data:', this.articlePopularityData);
        this.renderChart();
      },
      (error) => {
        console.error('Error fetching article popularity:', error);
      }
    );
  }
  renderChart(): void {
    const ctx = document.getElementById('articlePopularityChart') as HTMLCanvasElement;
    if (ctx && !this.articlePopularityChart) {
      this.articlePopularityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.articlePopularityData.map((item) => item.article_id),
          datasets: [
            {
              label: 'Total Comments',
              data: this.articlePopularityData.map((item) => item.total_comments),
              backgroundColor: 'rgba(210, 180, 140, 0.5)', // Bright orange color
              borderColor: 'rgba(101, 67, 33, 0.5)',
              borderWidth: 1,
            },
            {
              label: 'Total Likes',
              data: this.articlePopularityData.map((item) => item.total_likes),
              backgroundColor: 'rgba(255, 182, 193, 0.5)', // Turquoise color
              borderColor: 'rgba(231, 84, 128, 0.5)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)', // Light gray gridlines
              },
              ticks: {
                font: {
                  size: 14, // Increase font size
                },
                color: 'rgba(0, 0, 0, 0.7)', // Dark gray font color should be directly inside ticks
              },
            },
            x: {
              grid: {
                display: false, // Hide x-axis gridlines
              },
              ticks: {
                font: {
                  size: 14, // Increase font size
                },
                color: 'rgba(0, 0, 0, 0.7)', // Dark gray font color should be directly inside ticks
              },
            },
          },
        },

      });
    }
  }

}
