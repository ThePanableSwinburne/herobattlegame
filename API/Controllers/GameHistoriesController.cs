using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class GameHistoriesController : ControllerBase
{
    private readonly DataContext context;
    public GameHistoriesController(DataContext context)
    {
        this.context = context;
    }

    public async Task<bool> SaveAll()
    {
        return await context.SaveChangesAsync() > 0;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GameHistory>>> GetGameHistories()
    {
        var gameHistories = context.GameHistory.ToListAsync();
        return await gameHistories;
    }

    [HttpPost]
     public async Task<ActionResult> AddHistoryRecord(GameHistory record)
     {
        context.GameHistory.Add(record);
        context.Entry(record).State = EntityState.Added;
        if (await SaveAll())
            return NoContent();
        return BadRequest("Failed to update user");
     }

}