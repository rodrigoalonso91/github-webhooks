import express from 'express';
import { environment } from './config';
import { GithubController } from './presentation';
import { GitHubService } from './presentation/services';
import { DiscordService } from './presentation/services/discord.service';

(async () => await main())();

async function main() {
  const app = express();

  const githubService = new GitHubService();
  const discordService = new DiscordService();
  const githubController = new GithubController(githubService, discordService);

  app.use(express.json());

  app.post('/api/github', githubController.WebhookHandler);

  app.listen(environment.PORT, () => {
    console.log(`Server running on port ${environment.PORT}`)
  })
}



