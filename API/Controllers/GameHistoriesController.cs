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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GameHistory>>> GetGameHistories()
    {
        var gameHistories = context.GameHistory.ToListAsync();
        return await gameHistories;
    }

}