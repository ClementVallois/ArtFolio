import { Command, CommandRunner, Option } from 'nest-commander';
import { SeederService } from 'src/infrastructure/services/faker/seeder/seeder.service';

interface SeedCommandOptions {
  path?: string;
}

@Command({ name: 'seed', description: 'Seed or clear database' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly seederService: SeederService) {
    super();
  }

  @Option({
    flags: '-p, --path [path]',
    description: 'Path to the project root',
  })
  parsePath(val: string): string {
    return val;
  }

  async run(
    passedParams: string[],
    options?: SeedCommandOptions,
  ): Promise<void> {
    const action = passedParams[0];
    if (options?.path) {
      process.chdir(options.path);
    }

    switch (action) {
      case 'seed':
        await this.seederService.seedAll();
        console.log('Database seeded successfully');
        break;
      case 'clear':
        await this.seederService.clearAll();
        console.log('Database cleared successfully');
        break;
      default:
        console.log('Invalid action. Use "seed" or "clear"');
    }
  }
}
